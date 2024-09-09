import mongoose from "mongoose";

const contentSchema = mongoose.Schema(
  {
    title: String,
    totalTime: String,
    subSection: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subContent",
      },
    ],
  },
  { timestamps: true }
);

const Content = mongoose.model("Content", contentSchema);
export default Content;
