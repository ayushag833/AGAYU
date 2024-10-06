import express from "express";
const router = express.Router();

import {
  authenticate,
  authorizeAsAdmin,
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
  approveCourse,
  fetchCourses,
  addCourseReview,
  filterCourses,
} from "../controllers/courseController.js";

router.route("/search").get(fetchCourses);
router
  .route("/")
  .post(authenticate, authorizeAsTeacher, createNewCourse)
  .get(fetchAllCourses);
router.route("/latest").get(getLatestCourses);
router.route("/popular").get(getPopularCourses);
router.route("/budget").get(getBudgetCourses);
router.route("/:id").get(getCourseById);
router.route("/update/:id").put(authenticate, authorizeAsTeacher, updateCourse);
router
  .route("/delete/:id")
  .delete(authenticate, authorizeAsTeacher, deleteCourse);
router.route("/approve").put(authenticate, authorizeAsAdmin, approveCourse);
router.route("/:id/reviews").post(authenticate, addCourseReview);
router.route("/filterCourses").post(filterCourses);

export default router;
