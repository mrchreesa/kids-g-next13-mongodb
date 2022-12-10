const mongoose = require("mongoose");

const AppointmentsSchema = new mongoose.Schema({
  startDate: Date,
  endDate: Date,
  title: String,
});

const Appointments =
  mongoose.models.Appointments ||
  mongoose.model("Appointments", AppointmentsSchema);

export default Appointments;
