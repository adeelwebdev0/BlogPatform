/// <reference path="./src/types/express.d.ts" />
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/configs/db";
import postRoutes from "./src/routes/postRoutes";
import authRoutes from "./src/routes/authRoutes";
import errorHandler from "./src/middleware/errorHandler";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}🚀🚀🚀`));
