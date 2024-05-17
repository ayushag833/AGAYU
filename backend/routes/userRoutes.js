import express from "express";
const router = express.Router();

import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
} from "../controllers/userController.js";

import {
  authenticate,
  authorizeAsAdmin,
} from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAsAdmin, getAllUsers);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

export default router;
