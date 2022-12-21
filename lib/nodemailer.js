import nodemailer from "nodemailer";

const email = process.env.EMAIL;
const pass = process.env.EMAIL_PASS;

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  from: email,
  to: email,
};

module.exports = {
  email: async function verifyUserEmail(name, userEmail, token) {
    try {
      let info = await transporter.sendMail({
        from: email,
        to: userEmail,
        subject: `Hello ${name} please verify your email by clicking the link`,
        html: "http://localhost:3000/verifyUserEmail/" + name + "/" + token,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
