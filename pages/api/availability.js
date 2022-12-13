import connectDB from "../../lib/connectDB";
import Users from "../../model/users";
import Cookies from "cookies";
import { decode } from "jsonwebtoken";

const handler = async (req, res) => {
  const cookies = new Cookies(req, res);
  const jwt = cookies.get("auth");
  await connectDB();
  console.log("Connected to Mongo");
  if (jwt) {
    const jwtDecoded = decode(jwt);
    const { username } = jwtDecoded;

    if (req.method === "POST") {
      await Users.findOneAndUpdate(
        { username: username },
        { $push: { availability: req.body } },
        {
          new: true,
        }
      )
        .then((response) => {
          res.status(201).send("Slot added successfully" + response);
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send("Slot adding failed" + error.message);
        });
    } else if (req.method === "GET") {
      await Users.find({ username })

        .then((response) => {
          res.status(200).send(response);
        })
        .catch((error) => {
          console.log(error);
          res.status(400).send("Slots fetch failed" + error.message);
        });
    } else if (req.method === "DELETE") {
      const { Date, Time } = req.body;

      await Users.findOneAndUpdate(
        username,
        { $pull: { availability: { Date, Time } } },
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
    } else {
      res.status(400).send("Not Auth " + error.message);
    }
  }
};

export default handler;
