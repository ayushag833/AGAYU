import express from "express";
import {
  createCategory,
  getCategory,
  getAllCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import {
  authenticate,
  authorizeAsAdmin,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .get(getAllCategory)
  .post(authenticate, authorizeAsAdmin, createCategory);
router.get("/:id", authenticate, getCategory);
router.put("/update/:id", authenticate, authorizeAsAdmin, updateCategory);
router.delete("/delete/:id", authenticate, authorizeAsAdmin, deleteCategory);

export default router;
