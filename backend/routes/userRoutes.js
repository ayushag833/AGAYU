import express from "express";
const router = express.Router();

import {
  createUser,
  loginUser,
  logoutUser,
  getAllUsers,
  updateUser,
  updatePassword,
  deleteUser,
  showPurchasedCourses,
  showCreatedCourses,
  purchaseCourse,
  paymentCheck,
  updatePositioning,
} from "../controllers/userController.js";

import {
  authenticate,
  authorizeAsAdmin,
} from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(createUser)
  .get(authenticate, authorizeAsAdmin, getAllUsers);
router.route("/purchaseCourse").post(authenticate, purchaseCourse);
router.route("/paymentCheck").post(authenticate, paymentCheck);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/update/:id").put(authenticate, updateUser);
router.route("/delete/:id").delete(authenticate, deleteUser);
router.route("/password/:id").put(authenticate, updatePassword);
router.route("/purchasedCourses/:id").get(authenticate, showPurchasedCourses);
router.route("/createdCourses/:id").get(authenticate, showCreatedCourses);
router.route("/updatePositioning/:id").post(authenticate, updatePositioning);

export default router;
