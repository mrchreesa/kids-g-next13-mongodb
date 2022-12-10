import connectDB from "../../lib/connectDB";
import Form from "../../model/contactFormModel";

const handler = async (req, res) => {
  try {
    const contactFormEntries = await Form.find();
    res.send(contactFormEntries);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

export default handler;
