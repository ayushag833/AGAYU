import express from "express";
const router = express.Router();

import {
  authenticate,
  authorizeAsTeacher,
} from "../middlewares/authMiddleware.js";

import {
  createNewCourse,
  fetchAllCourses,
  getLatestCourses,
  getBudgetCourses,
  getPopularCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

router
  .route("/")
  .post(authenticate, authorizeAsTeacher, createNewCourse)
  .get(fetchAllCourses);

router.route("/latest").get(getLatestCourses);
router.route("/popular").get(getPopularCourses);
router.route("/budget").get(getBudgetCourses);
router.route("/:id").get(getCourseById);
router.route("/update/:id").put(updateCourse);
router.route("/delete/:id").delete(deleteCourse);

export default router;
