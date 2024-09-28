import mongoose from "mongoose";

const contentSchema = mongoose.Schema(
  {
    title: String,
    totalTime: String,
    subContent: [
      {
        title: String,
        description: String,
        video: String,
        time: String,
      },
    ],
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);
export default Content;
