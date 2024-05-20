import { v2 as cloudinary } from "cloudinary";
import path from "path";

import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const uploadFile = async (file) => {
  try {
    const extName = path.extname(file.originalname).toLowerCase();
    if (
      extName === ".jpg" ||
      extName === ".jpeg" ||
      extName === ".png" ||
      extName === ".webp"
    ) {
      const result = await cloudinary.uploader.upload(file.path);
      return result;
    } else if (extName === ".mp4") {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "video",
      });
      return result;
    } else if (
      extName === ".pdf" ||
      extName === ".pptx" ||
      extName === ".docx"
    ) {
      const result = await cloudinary.uploader.upload(file.path, {
        resource_type: "raw",
        format: extName.substring(1),
      });
      return result;
    }
  } catch (error) {
    console.log(error.message);
    return res.status(400).json({ message: "No file provided" });
  }
};

export default uploadFile;
