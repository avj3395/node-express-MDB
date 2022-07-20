import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  mobile_number: String,
  address: String,
  city: String,
  place: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userData = mongoose.model("userData", userSchema);

export default userData;
