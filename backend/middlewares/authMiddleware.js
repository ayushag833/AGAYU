import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const authenticate = async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  if (authorization && authorization.startsWith("Bearer ")) {
    token = authorization.split(" ")[1];
  } else {
    return res.status(401).json({ message: "Authorization header missing" });
  }
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ Error: error.message });
    }
  } else {
    return res.status(400).json({ Error: "Not authorized, no token." });
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
