import { Schema, model } from "mongoose";
const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "username is required"],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  verificationToken: {
    type: String,
    select: false,
  },
  verificationTokenExpires: {
    type: Date,
    select: false,
  },
});
const User = model("User", userSchema);
export default User;
