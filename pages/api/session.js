import connectDB from "../../lib/connectDB";
import Users from "../../model/users";
import cookie from "cookie";

const handler = async (req, res) => {
  //Get session
  if (req.method === "GET") {
    if (req.headers.cookie) {
      res.json({ message: "Session created" });
    } else {
      res.status(400).json({ message: "Not Authorised" });
    }
  } else {
    res.status(400).json({ message: "Bad request" });
  }
};
export default handler;
