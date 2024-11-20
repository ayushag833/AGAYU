import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";
import { stripe } from "../index.js";
import Course from "../models/courseModel.js";

const createUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    if (!fullName) {
      return res.status(400).json({ Error: "Please enter your Full Name" });
    }
    if (!email) {
      return res.status(400).json({ Error: "Please enter your Email" });
    }
    if (!password) {
      return res.status(400).json({ Error: "Please enter your Password" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ Error: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    const token = generateToken(res, newUser._id);
    return res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ Error: "Please enter your Email" });
    }
    if (!password) {
      return res.status(400).json({ Error: "Please enter your Password" });
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ Error: "User does not exist!" });
    }

    const checkPassword = await bcrypt.compare(password, userExists.password);
    if (!checkPassword) {
      return res.status(400).json({ Error: "Password does not match!" });
    }
    const obj = await User.findOne({ email }).select("-password");
    const userexist = obj.toObject();
    const token = generateToken(res, userExists._id);
    return res.status(200).json({
      ...userexist,
      token,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const Users = await User.find({});
    return res.status(200).json({ Users });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).select("-password");
    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword) return res.json({ error: "OldPassword is required" });
    if (!newPassword) return res.json({ error: "NewPassword is required" });

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const matchPassword = await bcrypt.compare(oldPassword, user.password);
    if (!matchPassword) {
      return res.json({ error: "Invalid Password" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password is changed" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User account is deleted Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const purchaseCourse = async (req, res) => {
  try {
    const { userId, courseId } = req.body;
    const coursesToAdd = Array.isArray(courseId) ? courseId : [courseId];

    await User.findByIdAndUpdate(userId, {
      $addToSet: { coursesPurchased: { $each: coursesToAdd } },
    });

    const courses = await Course.find({ _id: { $in: coursesToAdd } });

    await Promise.all(
      courses.map(async (course) => {
        const teacher = await User.findById(course.user);
        const enrolledStudents = course.studentsEnrolled.length;
        const revenue = course.price;
        const totalRevenueForCourse = revenue * enrolledStudents;
        const existingRevenue = teacher.courseRevenue.find(
          (r) => r.course.toString() === course._id.toString()
        );
        if (existingRevenue) {
          existingRevenue.revenueByCourse += totalRevenueForCourse;
          existingRevenue.datePurchased = Date.now();
        }
        teacher.totalRevenue += totalRevenueForCourse;
        await teacher.save();
      })
    );

    await Course.updateMany(
      { _id: { $in: coursesToAdd } },
      {
        $addToSet: { studentsEnrolled: userId },
      }
    );

    return res.status(200).json({
      message: "You have successfully purchased the course!",
    });
  } catch (error) {
    console.log("Error in showing courses", error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const paymentCheck = async (req, res) => {
  try {
    const { courseId, discountPercentage } = req.body;
    const coursesToAdd = Array.isArray(courseId) ? courseId : [courseId];
    const courses = await Course.find({ _id: { $in: coursesToAdd } }).exec();

    const lineItems = courses.map((course) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: course.name,
          images: [course.image],
        },
        unit_amount: course.price * 100,
      },
      quantity: 1,
    }));

    const coupon = await stripe.coupons.create({
      percent_off: discountPercentage,
      duration: "once",
      name: "Discount",
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      discounts: [
        {
          coupon: coupon.id,
        },
      ],
      success_url:
        process.env.NODE_ENV === "DEVELOPMENT"
          ? `http://localhost:5173/success/${coursesToAdd}`
          : `https://agayu-frontend.onrender.com/success${coursesToAdd}`,
      cancel_url:
        process.env.NODE_ENV === "DEVELOPMENT"
          ? "http://localhost:5173/cancel"
          : "https://agayu-frontend.onrender.com/cancel",
    });

    return res.status(200).json({
      id: session.id,
      message: "Payment is successful!",
    });
  } catch (error) {
    console.log("error in showing courses", error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const showPurchasedCourses = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate(
      "coursesPurchased"
    );
    return res.status(200).json(user.coursesPurchased);
  } catch (error) {
    console.log("error in showing courses", error.message);
    return res.status(500).json({ Error: error.message });
  }
};

const showCreatedCourses = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("coursesCreated");
    return res.status(200).json(user.coursesCreated);
  } catch (error) {
    console.log("error in showing courses", error.message);
    return res.status(500).json({ Error: error.message });
  }
};

export {
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
};
