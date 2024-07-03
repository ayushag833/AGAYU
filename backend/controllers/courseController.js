import Course from "../models/courseModel.js";

const createNewCourse = async (req, res) => {
  try {
    const {
      name,
      title,
      description,
      price,
      includes,
      modules,
      rightAudience,
      requirements,
      tags,
    } = req.fields;

    switch (true) {
      case !name:
        return res.json({ error: "Name is required" });
      case !title:
        return res.json({ error: "Title is required" });
      case !description:
        return res.json({ error: "Description is required" });
      case !price:
        return res.json({ error: "Price is required" });
      case !includes:
        return res.json({ error: "Includes are required" });
      case !modules:
        return res.json({ error: "Modules are required" });
      case !rightAudience:
        return res.json({ error: "Right Audience is required" });
      case !requirements:
        return res.json({ error: "Requirements are required" });
      case !tags:
        return res.json({ error: "Tags are required" });
    }
    const newCourse = new Course({
      ...req.fields,
      teacherName: req.user.fullName,
      user: req.user._id,
    });
    await newCourse.save();
    return res.status(201).json(newCourse);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Serval Error");
  }
};

const addHeading = async (req, res) => {
  try {
    const { heading, courseId } = req.fields;

    const course = Course.findById(courseId);

    if (!heading) {
      return res.json({ error: "Heading is required" });
    }
    const newHeading = {
      heading,
    };
    course.content.push(newHeading);
    await course.save();
    return res.status(201).json(course);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Serval Error");
  }
};

const addSubHeading = async (req, res) => {
  try {
    const { subHeading, headingId, courseId } = req.fields;

    const course = Course.findById(courseId);
    const heading = course.find(() => heading._id === headingId);

    if (!subHeading) {
      return res.json({ error: "Sub Heading is required" });
    }
    const newSubHeading = {
      subHeading,
    };
    heading.subHeading.push(newSubHeading);
    await course.save();
    return res.status(201).json(course);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal Serval Error");
  }
};

const fetchAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find({});
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

export {
  createNewCourse,
  getLatestCourses,
  fetchAllCourses,
  getPopularCourses,
  getBudgetCourses,
  getCourseById,
  addHeading,
  addSubHeading,
};
