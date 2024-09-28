import express from "express";
const router = express.Router();
// import formidable from "express-formidable";

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
  addHeading,
  addSubHeading,
} from "../controllers/courseController.js";

router
  .route("/")
  .post(authenticate, authorizeAsTeacher, createNewCourse)
  // .post(authenticate, authorizeAsTeacher, formidable(), createNewCourse)
  .get(fetchAllCourses);

router.post(
  "/heading",
  authenticate,
  authorizeAsTeacher,
  // formidable(),
  addHeading
);
router.post(
  "/subheading",
  authenticate,
  authorizeAsTeacher,
  // formidable(),
  addSubHeading
);
router.route("/latest").get(getLatestCourses);
router.route("/popular").get(getPopularCourses);
router.route("/budget").get(getBudgetCourses);
router.route("/:id").get(getCourseById);

export default router;
