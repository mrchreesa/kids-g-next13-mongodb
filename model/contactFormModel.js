import mongoose from "mongoose";

const ContactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name."],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  school: {
    type: String,
    required: [true, "Please provide the school's name"],
    maxlength: [60, "School's Name cannot be more than 60 characters"],
  },

  phone: {
    type: Number,
    required: [true, "Please provide phone number."],
    minlength: [9, "Please provide a valid phone number"],
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
  },
});
const Form =
  mongoose.models.ContactForm ||
  mongoose.model("ContactForm", ContactFormSchema);

export default Form;
