import express from "express";
import { getImage, uploadImage } from "../controllers/images.js";

import multer from "multer";
import path from "path";
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, "./uploads");
  },
  filename: (req, file, callBack) => {
    console.log("MULTER== filename=====", file);
    callBack(
      null,
      file.originalname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/upload", upload.single("myFile"), uploadImage);
router.get("/get-image", getImage);

export default router;
