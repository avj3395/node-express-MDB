import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
} from "../controllers/user.js";
import {
  validateRegister,
  validateLogin,
  verifyUser,
} from "../middleware/user.js";
const router = express.Router();

router.post("/add-user", validateRegister, registerUser);
router.post("/login", validateLogin, loginUser);
router.get("/get-user", verifyUser, getUser);
router.post("/user-update", verifyUser, updateUser);

export default router;
