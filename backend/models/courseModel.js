import mongoose from "mongoose";

const subContentSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    video: String,
    time: String,
  },
  { timestamps: true }
);

const contentSchema = mongoose.Schema(
  {
    title: String,
    time: String,
    subContent: [subContentSchema],
  },
  { timestamps: true }
);

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const courseSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    includes: {
      type: String,
      required: true,
    },
    modules: {
      type: String,
      required: true,
    },
    rightAudience: {
      type: String,
      required: true,
    },
    totalTime: String,
    content: [contentSchema],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    requirements: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    overallRating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    teacherName: {
      type: String,
      required: true,
    },
    readyToPublished: {
      type: Boolean,
      default: false,
    },
    approvedByAdmin: {
      type: Boolean,
      default: false,
    },
    language: {
      type: String,
      // required: true,
    },
    levels: {
      type: String,
      enum: ["All Levels", "Beginner", "Intermediate", "Advanced"],
      // required: true,
    },
    tags: [
      {
        type: String,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model("Course", courseSchema);
export default Course;
