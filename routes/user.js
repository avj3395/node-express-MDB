import express from "express";
import { registerUser, loginUser } from "../controllers/user.js";
import { validateRegister, validateLogin } from "../middleware/user.js";
const router = express.Router();

router.post("/add-user", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);

export default router;
