import Users from "../../model/users";

const handler = async (req, res) => {
  try {
    const usersList = await Users.find();
    res.send(usersList);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export default handler;
