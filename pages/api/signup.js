import connectDB from "../../lib/connectDB";
import Users from "../../model/users";
import { sign } from "jsonwebtoken";
import axios from "axios";
import bcrypt from "bcrypt";
import cookie from "cookie";

const handler = async (req, res) => {
  await connectDB();
  console.log("Connected to Mongo");

  //Register admin
  if (req.method === "POST") {
    const data = req.body;
    if (!data || !data.email || !data.password) {
      return res.status(400).send({ message: "Bad request" });
    }
    const { username, password, email, availability } = req.body;
    if (password.length >= 6) {
      bcrypt.hash(password, 10).then((hash) => {
        const newUser = new Users({
          username,
          password: hash,
          email,
          superAdmin: true,
          availability: [],
          appointments: [],
        });

        newUser
          .validate()
          .then(() => {
            console.log("Validation passed.");
            newUser
              .save()
              .then(() => {
                console.log("Saved successfully." + newUser);
                // const jwt = sign(
                //   {
                //     id: newUser._id,
                //     username: newUser.username,
                //     eamil: newUser.email,
                //     superAdmin: newUser.superAdmin,
                //   },
                //   process.env.ACCESS_TOKEN_SECRET,
                //   { expiresIn: "30d" }
                // );
                // res.setHeader(
                //   "Set-Cookie",
                //   cookie.serialize("auth", jwt, {
                //     httpOnly: true,
                //     secure: process.env.NODE_ENV !== "development",
                //     sameSite: "strict",
                //     maxAge: 3600,
                //     path: "/",
                //   })
                // );
                res.status(200).json({ message: "Registration successful" });
                console.log("Registration successful.");
              })
              .catch(() => {
                res.status(400).send({ message: "Saving failed" });
                console.log("Saving failed.");
              });
          })
          .catch(() => {
            res.status(401).send("User Validation failed.");
            console.log("Validation failed.");
          });
      });
    } else {
      res.status(500).send("Invalid Credentials");
    }
  }
  // return res.status(400).json({ message: "Bad request" });
};
export default handler;
