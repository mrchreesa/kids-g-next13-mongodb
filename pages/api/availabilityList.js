import Users from "../../model/users";
import connectDB from "../../lib/connectDB";

const handler = async (req, res) => {
  await connectDB();
  console.log("Connected to Mongo");
  try {
    const availiblityList = await Users.find();
    res.status(200).send(availiblityList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;
