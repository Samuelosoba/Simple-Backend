// routes/taskRoutes.js
import express from "express";
import { createTask, getTasks } from "../controllers/task.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getTasks);
router.post("/", verifyToken, createTask); // only admin

export default router;
