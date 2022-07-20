import userData from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { password, name, email } = req.body;

  try {
    const user = await userData.findOne({ email: email });
    if (user) {
      return res.status(400).send({
        message: "User already exist........",
      });
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    if (hashPassword) {
      var token = jwt.sign({ email }, "avj3395");
      const newUser = new userData({ name, email, password: hashPassword });

      try {
        await newUser.save();
        const result = {
          name: newUser.name,
          email: newUser.email,
          id: newUser._id,
          access_token: token,
        };
        res.status(201).json(result);
      } catch (error) {
        res.status(409).json({ message: error.message });
      }
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
