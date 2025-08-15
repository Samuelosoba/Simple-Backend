// routes/authRoutes.js
import express from "express";
import { getAllUsers, loginUser, registerUser, updateUserRole, } from "../controllers/user.js";

import { verifyAdmin } from "../middleware/verifyadmin.js";
import { deleteUser } from "../controllers/user.js"; 
import { verifyToken } from "../middleware/auth.js";


const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);
router.patch("/:id/role", verifyToken, verifyAdmin, updateUserRole);
router.get("/users", verifyToken, verifyAdmin, getAllUsers);

export default router;
