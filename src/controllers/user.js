import User from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateAccessToken } from "../config/generateToken.js"; 
import createHttpError from "http-errors";

export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body; // include role

    if (!username || !email || !password) {
      return next(createHttpError(400, "All fields are required"));
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return next(createHttpError(409, "Email or username already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || "user", // default to "user"
    });

    const token = generateAccessToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      accessToken: token,
    });
  } catch (err) {
    next(err);
  }
};


export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) return next(createHttpError(404, "User not found"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(createHttpError(401, "Invalid credentials"));

    const token = generateAccessToken(user._id, user.role);
    res.status(200).json({ success: true, accessToken: token });
  } catch (err) {
    next(err);
  }
};
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // exclude passwords
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    next(err);
  }
};
export const updateUserRole = async (req, res, next) => {
  try {
    const { role } = req.body;
    const validRoles = ["user", "admin"];

    if (!validRoles.includes(role)) {
      return next(createHttpError(400, "Invalid role specified"));
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );

    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message: "User role updated successfully",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    next(err);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};