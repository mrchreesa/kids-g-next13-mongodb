import connectDB from "../../lib/connectDB";

import RequestedAppointments from "../../model/requestedAppointments";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;
    if (!data) {
      return res.status(400).send({ message: "Bad request" });
    }
    await connectDB();
    try {
      const requestEmail = await RequestedAppointments.find({
        email: data.email,
      });

      if (requestEmail.length === 0) {
        const newRequest = await RequestedAppointments.create(data);
        newRequest
          .validate()
          .then(() => {
            newRequest
              .save()
              .then(() => {
                res.status(201).send({ message: "OK" });
                console.log("request saved successfully");
              })
              .catch(() => {
                res.status(400).send({ message: "Saving failed" });
                console.log("Saving failed.");
              });
          })
          .catch(() => {
            res.status(401).send({ message: "Validation failed." });
            console.log("Validation failed.");
          });
      } else {
        console.log("Existing document found", requestEmail);
        res.status(202).json({ success: true });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error });
    }
  }
  // return res.status(400).json({ message: "Bad request" });
};
export default handler;
