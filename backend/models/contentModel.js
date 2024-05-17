import mongoose from "mongoose";

const subSectionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    lectures: {
      type: String,
      required: true,
    },
    length: {
      type: String,
      required: true,
    },
    videos: {
      type: String,
      required: true,
    },
    images: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const contentSchema = mongoose.Schema(
  {
    sections: {
      type: String,
      required: true,
    },
    lectures: {
      type: String,
      required: true,
    },
    length: {
      type: String,
      required: true,
    },
    subSection: [subSectionSchema],
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);
export default Content;
