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
      language,
      levels,
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
      case !language:
        throw new Error("Language is required");
      case !levels:
        throw new Error("Levels is required");
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

    // await Category.findByIdAndUpdate(category, { $push: { courses: newCourse._id } });
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
    const allCourses = await Course.find({}).sort({ updatedAt: -1 });
    return res.status(200).json(allCourses);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Serval Error");
  }
};

const getLatestCourses = async (req, res) => {
  try {
    const topCourses = await Course.find({}).sort({ createdAt: -1 }).limit(8);
    return res.status(200).json(topCourses);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Serval Error");
  }
};

const getPopularCourses = async (req, res) => {
  try {
    const topCourses = await Course.find({})
      .sort({ overallRating: -1 })
      .limit(8);
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
    const course = await Course.findById(req.params.id).populate([
      {
        path: "reviews.user",
        select: "image",
      },
      {
        path: "user",
        select: "coursesCreated",
        populate: {
          path: "coursesCreated",
        },
      },
    ]);
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
    // Removing the course id from old category database
    const course = await Course.findById(req.params.id);
    await Category.findByIdAndUpdate(course.category, {
      $pull: { courses: req.params.id },
    });

    // Updating the course
    await Course.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    // Adding the course id to new category database
    await Category.findByIdAndUpdate(req.body.category, {
      $addToSet: { courses: req.params.id },
    });

    return res.status(200).json({ message: "Course Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Serval Error");
  }
};

const deleteCourse = async (req, res) => {
  try {
    // Removing the course id from old category database
    const course = await Course.findById(req.params.id);
    await Category.findByIdAndUpdate(course.category, {
      $pull: { courses: req.params.id },
    });

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
    return res.status(200).json({ message: "Course Approved Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Server Error");
  }
};

const fetchCourses = async (req, res) => {
  try {
    const { search, page = 1, category, overallRating = 0 } = req.body;
    const pageSize = 4;

    const searchFields = [
      "name",
      "title",
      "description",
      "includes",
      "modules",
      "rightAudience",
      "requirements",
      "teacherName",
      "language",
      "levels",
      //"category",
      //"tags"
    ];

    const searchItems = search
      ? {
          $or: searchFields.map((field) => ({
            [field]: { $regex: new RegExp(search, "i") },
          })),
        }
      : {};

    const categoryFilter =
      category && category.length > 0 ? { category: { $in: category } } : {};

    const courses = await Course.find({
      ...searchItems,
      ...categoryFilter,
      overallRating: { $gte: Number(overallRating) },
    })
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    res.json({
      courses,
      pages: Math.ceil(courses.length / pageSize),
      count: courses.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json("Internal Server Error");
  }
};

const addCourseReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const course = await Course.findById(req.params.id);

    if (course) {
      const alreadyReviewed = course.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Course already reviewed");
      }

      const review = {
        name: req.user.fullName,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };

      course.reviews.push(review);

      course.numReviews = course.reviews.length;

      course.overallRating =
        course.reviews.reduce((acc, item) => item.rating + acc, 0) /
        course.reviews.length;

      await course.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Course not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error?.message);
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
  fetchCourses,
  addCourseReview,
};
