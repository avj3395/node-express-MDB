import mongoose from "mongoose";

const imageSchema = mongoose.Schema({
  name: String,
  url: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const imageData = mongoose.model("imageData", imageSchema);

export default imageData;
