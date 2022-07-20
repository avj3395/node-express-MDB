import express from "express";
import { registerUser } from "../controllers/user.js";
import { validateRegister } from "../middleware/user.js";
const router = express.Router();

router.post("/add-user", validateRegister, registerUser);

export default router;
