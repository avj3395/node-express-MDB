import express from "express";
import mongoose from "mongoose";
import imageRoutes from "./routes/images.js";

const app = express();

app.get("/", (req, res) => {
  res.send("welcome to my server");
});

app.use("/image", imageRoutes);
app.use("/uploads", express.static("uploads"));

app.listen(5000, () => {
  console.log("server is running on 5000...");
  mongoose.connect("mongodb://localhost:27017/akshayDb", (err, db) => {
    console.log("mongoose connected...");
  });
});
