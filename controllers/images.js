import imageData from "../models/Image.js";

export const uploadImage = async (req, res) => {
  const { file } = req;
  console.log("log file=======", file);
  if (!file) {
    return res.status(405).send({
      message: "NO file found..........",
    });
  }

  const newImage = new imageData({ name: file.filename, url: file.path });

  try {
    await newImage.save();

    res.status(201).json(newImage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
