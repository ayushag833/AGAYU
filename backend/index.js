import express from "express";
import dotenv from "dotenv";
import connect from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";

// Routes
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cloudinaryUploadRoutes from "./routes/cloudinaryUploadRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 8000;

const app = express();

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/cloudinary", cloudinaryUploadRoutes);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
