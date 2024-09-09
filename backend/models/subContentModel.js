import mongoose from "mongoose";

const subContentSchema = mongoose.Schema(
  {
    title: String,
    description: String,
    videos: String,
  },
  { timestamps: true }
);

export default mongoose.model("subContent", subContentSchema);
