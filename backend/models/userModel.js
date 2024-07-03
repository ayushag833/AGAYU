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
    gender: {
      type: String,
    },
    address: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userModel);
