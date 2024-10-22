import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import express from "express";
import connect from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Routes
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cloudinaryUploadRoutes from "./routes/cloudinaryUploadRoutes.js";

const PORT = process.env.PORT || 8000;

const app = express();

connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/cloudinary", cloudinaryUploadRoutes);
app.use("/api/category", categoryRoutes);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
