import mongoose from "mongoose";

const categorySchema = mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("category", categorySchema);
