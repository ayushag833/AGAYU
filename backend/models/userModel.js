import mongoose from "mongoose";

const userModel = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    bio: {
      type: String,
      trim: true,
    },

    // For Student :-
    coursesPurchased: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    // For Teacher :-
    coursesCreated: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
      },
    ],
    totalRevenue: {
      type: Number,
      default: 0,
    },
    courseRevenue: [
      {
        course: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course",
        },
        revenueByCourse: {
          type: Number,
          default: 0,
        },
        datePurchased: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", userModel);
