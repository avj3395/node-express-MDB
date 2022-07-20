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
      const token = jwt.sign({ email }, "avj3395");
      const newUser = new userData({ name, email, password: hashPassword });

      try {
        await newUser.save();
        const result = {
          data: {
            name: newUser.name,
            email: newUser.email,
            id: newUser._id,
          },
          message: "Registration successfully......",
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

export const loginUser = async (req, res) => {
  const { password, email } = req.body;

  try {
    const user = await userData.findOne({ email: email });

    if (user) {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (isPasswordCorrect) {
        const token = jwt.sign({ email }, "avj3395");

        const result = {
          data: {
            name: user.name,
            email: user.email,
            id: user._id,
          },
          message: "Login Successfully..............",
          access_token: token,
        };
        return res.status(201).json(result);
      }
      return res.status(400).json({
        message: "Incorrect Email or Password....",
      });
    }
    return res.status(400).json({
      message: "User not found........",
    });
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  const headerAuth = req.headers.authorization.split("Bearer ");
  const token = headerAuth[1];
  const decodedData = jwt.verify(token, "avj3395");

  if (decodedData.email) {
    try {
      const user = await userData.findOne({ email: decodedData.email });
      if (user) {
        const result = {
          data: {
            name: user.name,
            email: user.email,
            id: user._id,
          },
        };
        return res.status(200).send(result);
      }
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }

  return res.status(409).json({
    message: "Something error please try again later ....",
  });
};

export const updateUser = async (req, res) => {
  const { name, mobile_number, address, city, place } = req.body;
  const headerAuth = req.headers.authorization.split("Bearer ");
  const token = headerAuth[1];
  const decodedData = jwt.verify(token, "avj3395");
  if (decodedData.email) {
    console.log("ACCESS DATA======", decodedData);
    const updateData = {
      $set: {
        name: name,
        mobile_number: mobile_number,
        address: address,
        city: city,
        place: place,
      },
    };
    try {
      const user = await userData.findOneAndUpdate(
        { email: decodedData.email },
        updateData,
        { new: true }
      );

      return res.status(200).send(user);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  }
  return res.status(409).json({
    message: "update user api in progress ....",
  });
};
