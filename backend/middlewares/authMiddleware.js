import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.userId).select("-password");
      req.user = user;
    } else {
      return res.status(400).json({ Error: "Authentication Failed!" });
    }
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ Error: error.message });
  }
};

const authorizeAsAdmin = (req, res, next) => {
  try {
    if (req.user && req.user.role == "admin") {
      next();
    } else {
      return res.status(400).json({ Error: "Not authorized as an admin" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ Error: error.message });
  }
};

const authorizeAsTeacher = (req, res, next) => {
  try {
    if (req.user && req.user.role == "teacher") {
      next();
    } else {
      return res.status(400).json({ Error: "Not authorized as a teacher" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ Error: error.message });
  }
};

export { authenticate, authorizeAsAdmin, authorizeAsTeacher };
