// routes/taskRoutes.js
import express from "express";
import { createTask, deleteTask, getTasks } from "../controllers/task.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();
router.get("/", getTasks);
router.post("/", verifyToken, createTask);
router.delete("/:id", verifyToken, deleteTask);

export default router;
