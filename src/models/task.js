import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const Post = model("Task", taskSchema);
export default Post;
