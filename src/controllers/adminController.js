// controllers/adminController.js

import User from "../models/User.js";
import createHttpError from "http-errors";

// PATCH /api/users/:id/role
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
