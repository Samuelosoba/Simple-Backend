// app.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectToDb from "./config/database.js"; 
import authRoutes from "./routes/user.js";
import taskRoutes from "./routes/task.js";
import errorHandler from "./middleware/errorHandler.js"; 

dotenv.config();
connectToDb();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use(errorHandler);

export default app;
