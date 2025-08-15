// middleware/verifyAdmin.js
import createHttpError from "http-errors";

export const verifyAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return next(createHttpError(403, "Access denied: Admins only"));
  }
  next();
};
