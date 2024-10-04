import mongoose from "mongoose";

const userModel = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "teacher", "admin"],
      required: true,
    },
    coursesPurchased: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    coursesCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    coursesApproved: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    phone: {
      type: String,
      unique: true,
      minlength: [10, "minimum 10 digit phone number is required"],
      maxlength: [11, "maximum 11 digit phone number is required"],
      match: [/^\d{10,11}$/, "Phone number must contain only digits"],
    },
    image: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png",
    },
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    bio: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userModel);
