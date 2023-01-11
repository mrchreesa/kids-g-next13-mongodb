import connectDB from "../../lib/connectDB";
import Users from "../../model/users";
import { sign } from "jsonwebtoken";
import { transporter, mailOptions } from "../../lib/nodemailer";

const handler = async (req, res) => {
  await connectDB();
  //Verify user email
  if (req.method === "POST") {
    const { data } = req.body;
    const trimmedName = data.name.replaceAll(" ", "");
    const trimmedNameAdmin = data.slot.username.replaceAll(" ", "");
    // const user = await Users.find({ email });
    const jwt = sign(
      {
        username: data.name,
        email: data.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    try {
      await transporter.sendMail({
        from: process.env.NEXT_PUBLIC_EMAIL,
        to: data.email,
        subject: `Hello ${data.name} please verify your email by clicking the link`,
        text: "Hello",
        //In production need to change localhost:3000 to the sites domain
        html:
          "http://localhost:3000/verifyUserEmail/" +
          trimmedName +
          "/" +
          data.slot.slot +
          "/" +
          trimmedNameAdmin +
          "/" +
          jwt,
      });
      res.status(200).send({ message: "Verification email sent successfully" });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).json({ message: "Verification email failed" });
  }
};
export default handler;
