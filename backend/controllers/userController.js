import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";

const createUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password || !role) {
      return res.status(400).json({ Error: "Please provide all the details!" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ Error: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    generateToken(res, newUser._id);
    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ Error: "Please provide all the details!" });
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ Error: "User does not exist!" });
    }

    const checkPassword = await bcrypt.compare(password, userExists.password);
    if (!checkPassword) {
      return res.status(400).json({ Error: "Password does not match!" });
    }

    generateToken(res, userExists._id);

    return res.status(200).json({
      _id: userExists._id,
      fullName: userExists.fullName,
      email: userExists.email,
      role: userExists.role,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).send("Logout successfully!");
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find({});
    return res.status(200).json({ Users });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

export { createUser, loginUser, logoutUser, getAllUsers };
