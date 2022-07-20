import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const userData = mongoose.model("userData", userSchema);

export default userData;
