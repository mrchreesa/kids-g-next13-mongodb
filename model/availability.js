const mongoose = require("mongoose");

const AvailabilitySchema = new mongoose.Schema({
  start: Date,
});

const Availability =
  mongoose.models.Availability ||
  mongoose.model("Availability", AvailabilitySchema);

export default Availability;
