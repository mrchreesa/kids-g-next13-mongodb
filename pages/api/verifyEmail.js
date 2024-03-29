import connectDB from "../../lib/connectDB";
import { verify } from "jsonwebtoken";
import Users from "../../model/users";

const handler = async (req, res) => {
  const { token } = req.body;
  const { userName } = req.body;
  const { adminName } = req.body;
  const { slot } = req.body;
  let userObject;
  await connectDB();
  //Verify email token
  if (req.method === "POST") {
    const decoded = verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (decoded.username === userName) {
      try {
        userObject = await Users.findOne({ username: adminName });
      } catch (e) {
        console.log(e);
      }
      if (userObject.unverifiedAppointments.length > 0) {
        const slotObject = userObject.unverifiedAppointments.find(
          ({ name }) => name === userName
        );
        try {
          await Users.findOneAndUpdate(
            {
              username: adminName,
            },
            {
              $addToSet: { appointments: slotObject },
            },
            {
              upsert: true,
              new: true,
            }
          );
        } catch (error) {
          console.log(error);
          res.status(400).send({ message: "push appointment failed" });
        }
        try {
          await Users.findOneAndUpdate(
            {
              username: adminName,
            },
            {
              $pull: { availability: slot },
            },
            {
              new: true,
            }
          );
        } catch (error) {
          console.log(error);
          res.status(400).send({ message: "pull available slot failed" });
        }
        try {
          await Users.findOneAndUpdate(
            {
              username: adminName,
            },
            {
              $pull: {
                unverifiedAppointments: { name: userName },
              },
            },
            {
              new: true,
            }
          );
        } catch (error) {
          console.log(error);
          res.status(400).send({ message: "pull unverified failed" });
        }
      } else {
        res.status(400).json({ message: "user object not found" });
      }
    }
    res.status(200).send({ message: "Success" });
  } else {
    res.status(400).json({ message: "Verification email failed" });
  }
};
export default handler;
