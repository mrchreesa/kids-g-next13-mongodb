import connectDB from "../../lib/connectDB";
import Users from "../../model/users";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookie from "cookie";

const handler = async (req, res) => {
  await connectDB();
  console.log("Connected to Mongo");
  //Login admin
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = await Users.find({ email });
    bcrypt.compare(password, user[0]?.password, function (err, result) {
      if (!err && result) {
        const jwt = sign(
          {
            username: user[0].username,
            email: user[0].email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30d" }
        );
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("auth", jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 3600,
            path: "/",
          })
        );
        res.status(200).send({ message: "Welcome back to the app!" });
      } else {
        res.send({ success: false, message: "passwords do not match" });
      }
    });
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};
export default handler;
