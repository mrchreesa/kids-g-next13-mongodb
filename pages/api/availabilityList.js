import Users from "../../model/users";

const handler = async (req, res) => {
  try {
    const availiblityList = await Users.find();
    res.status(200).send(availiblityList);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export default handler;
