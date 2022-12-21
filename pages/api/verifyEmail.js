import connectDB from "../../lib/connectDB";
import Users from "../../model/users";
import { decode, verify } from "jsonwebtoken";
import verifyUserEmail from "../../lib/nodemailer";

const handler = async (req, res) => {
  const { token } = req.body;
  await connectDB();
  //Verify email token
  if (req.method === "POST") {
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);
    res.status(200).send({ message: "Email token verified" });
  } else {
    res.status(400).json({ message: "Verification email failed" });
  }
};
export default handler;
