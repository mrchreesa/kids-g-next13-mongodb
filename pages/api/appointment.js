import connectDB from "../../lib/connectDB";
import Users from "../../model/users";
import Cookies from "cookies";
import { decode } from "jsonwebtoken";

const handler = async (req, res) => {
  const cookies = new Cookies(req, res);
  const jwt = cookies.get("auth");
  if (req.method === "POST") {
    const data = req.body;
    if (!data || !data.name || !data.email) {
      return res.status(400).send({ message: "Bad request" });
    }
    await connectDB();

    try {
      await Users.findOneAndUpdate(
        { username: data.slot.username },
        {
          $push: { appointments: data },
          $pull: { availability: data.slot.slot },
        },

        {
          new: true,
        }
      ).then((response) => {
        res.status(201).send("Appointment added" + response);
      });
    } catch (error) {
      console.log(error);
      res.status(400).send("Appointment failed" + response);
    }
  } else if (req.method === "PATCH") {
    const jwtDecoded = decode(jwt);
    const { username } = jwtDecoded;

    // const obj = Object.assign({}, req.body);
    // const newObj = Object.keys(obj);
    console.log(req.body);
    await Users.findOneAndUpdate(
      { username },
      { $pull: { appointments: req.body } },
      {
        new: true,
      }
    )
      .then((response) => {
        res.status(201).send("Slot deleted successfully" + response);
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send(error.message);
      });
  }

  // return res.status(400).json({ message: "Bad request" });
};
export default handler;
