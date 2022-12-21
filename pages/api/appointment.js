import connectDB from "../../lib/connectDB";
import Users from "../../model/users";

const handler = async (req, res) => {
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
  }
  // return res.status(400).json({ message: "Bad request" });
};
export default handler;
