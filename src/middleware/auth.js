import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return next(createHttpError(401, "No token provided"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    next(createHttpError(401, "Invalid or expired token"));
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(createHttpError(403, "Admin access only"));
  }
  next();
};
