import RequestedAppointments from "../../model/requestedAppointments";
import connectDB from "../../lib/connectDB";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      await connectDB();
      const requests = await RequestedAppointments.find();
      res.status(200).send(requests);
    } catch (err) {
      res.status(400).send(err.message);
    }
  }
};

export default handler;
