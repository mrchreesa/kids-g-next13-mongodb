import connectDB from "../../lib/connectDB";
import Users from "../../model/users";
import { sign } from "jsonwebtoken";
import { transporter, mailOptions } from "../../lib/nodemailer";

const handler = async (req, res) => {
  await connectDB();
  //Verify user email
  if (req.method === "POST") {
    const { email, name } = req.body;
    // const user = await Users.find({ email });
    const jwt = sign(
      {
        username: name,
        email: email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    try {
      await transporter.sendMail({
        ...mailOptions,
        subject: `Hello ${name} please verify your email by clicking the link`,

        // html: "http://localhost:3000/verifyUserEmail/" + name + "/" + jwt,
      });
    } catch (error) {
      console.log(error);
    }

    res.status(200).send({ message: "Verification email sent successfully" });
  } else {
    res.status(400).json({ message: "Verification email failed" });
  }
};
export default handler;
