import Users from "../../model/users";
import connectDB from "../../lib/connectDB";

export async function getData() {
  await connectDB();

  const response = await Users.find();
  // const jsonData = await response.json();
  return response;
}
const handler = async (req, res) => {
  const jsonData = await getData();
  res.status(200).json(jsonData);
  // await connectDB();
  // console.log("Connected to Mongo");
  // try {
  //   const availiblityList = await Users.find();
  //   res.status(200).send(availiblityList);
  // } catch (error) {
  //   res.status(400).send(error.message);
  // }
};

export default handler;
