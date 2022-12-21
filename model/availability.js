const mongoose = require("mongoose");

const AvailabilitySchema = new mongoose.Schema({
  availability: { type: Array, trim: true },
});

const Availability =
  mongoose.models.Availability ||
  mongoose.model("Availability", AvailabilitySchema);

export default Availability;
