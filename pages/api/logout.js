import connectDB from "../../lib/connectDB";
import Users from "../../model/users";
import axios from "axios";
import bcrypt from "bcrypt";
import cookie from "cookie";

const handler = async (req, res) => {
  //Logout admin
  if (req.method === "DELETE") {
    res.setHeader("Set-Cookie", [
      cookie.serialize("auth", "", {
        maxAge: -1,
        path: "/",
      }),
    ]);

    return res.status(200).json({
      success: "Successfully logged out",
    });
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};
export default handler;
