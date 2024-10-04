import Course from "../models/courseModel.js";
import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";

const createNewCourse = async (req, res) => {
  try {
    const {
      name,
      title,
      description,
      price,
      image,
      includes,
      modules,
      rightAudience,
      category,
      content,
      requirements,
      tags,
    } = req.body;

    switch (true) {
      case !name:
        throw new Error("Name is required");
      case !title:
        throw new Error("Title is required");
      case !description:
        throw new Error("Description is required");
      case !price:
        throw new Error("Price is required");
      case !includes:
        throw new Error("Includes is required");
      case !modules:
        throw new Error("Modules is required");
      case !rightAudience:
        throw new Error("RightAudience is required");
      case !requirements:
        throw new Error("Requirements is required");
      case !tags:
        throw new Error("Tags is required");
      case !image:
        throw new Error("Image is required");
      case !category:
        throw new Error("Category is required");
      case !content:
        throw new Error("Content is required");
    }

    const totalTime = content.reduce((acc, cur) => {
      return acc + cur.time;
    }, 0);

    const newCourse = await Course.create({
      ...req.body,
      teacherName: req.user.fullName,
      user: req.user._id,
      totalTime,
    });

    const existingCategory = await Category.findById(category);
    existingCategory.courses.push(newCourse._id);
    await existingCategory.save();

    const existingUser = await User.findById(req.user._id);
    existingUser.coursesCreated.push(newCourse._id);
    await existingUser.save();

    return res.status(201).json(newCourse);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: error.message });
  }
};

const fetchAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({}).sort({ createdAt: -1 });
    return res.status(200).json(allCourses);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Serval Error");
  }
};

const getLatestCourses = async (req, res) => {
  try {
    const topCourses = await Course.find({}).sort({ id: -1 }).limit(8);
    return res.status(200).json(topCourses);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Serval Error");
  }
};

const getPopularCourses = async (req, res) => {
  try {
    const topCourses = await Course.find({}).sort().limit(8);
    return res.status(200).json(topCourses);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Serval Error");
  }
};

const getBudgetCourses = async (req, res) => {
  try {
    const topCourses = await Course.find({}).sort({ price: 1 }).limit(8);
    return res.status(200).json(topCourses);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Serval Error");
  }
};

const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course) {
      return res.status(200).json(course);
    } else {
      res.status(404);
      throw new Error("Course not found");
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Serval Error");
  }
};

const updateCourse = async (req, res) => {
  try {
    await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).json({ message: "Course Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Serval Error");
  }
};

const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Course Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Serval Error");
  }
};

const approveCourse = async (req, res) => {
  try {
    const { id, approvedByAdmin } = req.body;
    await Course.findByIdAndUpdate(id, { approvedByAdmin });

    const existingUser = await User.findById(req.user._id);
    if (approvedByAdmin) {
      if (!existingUser.coursesApproved.includes(id)) {
        existingUser.coursesApproved.push(id);
      }
    } else {
      existingUser.coursesApproved = existingUser.coursesApproved.filter(
        (courseId) => courseId.toString() !== id
      );
    }
    await existingUser.save();

    return res.status(200).json({ message: "Course Approved Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error");
  }
};

export {
  createNewCourse,
  getLatestCourses,
  fetchAllCourses,
  getPopularCourses,
  getBudgetCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  approveCourse,
};
