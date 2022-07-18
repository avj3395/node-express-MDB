import imageData from "../models/Image.js";

export const uploadImage = async (req, res) => {
  const { file } = req;
  console.log("LOG========", file);
  if (!file) {
    return res.status(200).send(
      JSON({
        message: "No image found",
      })
    );
  }
  // res.send(file);
  res.send("upload success");
};

export const getImage = async (req, res) => {
  res.send("GET image function=====");
};
