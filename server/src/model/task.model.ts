import mongoose from "mongoose";

export interface TaskDocument extends mongoose.Document {
  taskName: string;
  description: string;
  dueDate: Date;
  isCompleted: boolean;
}

const TaskSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    taskName: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
    isCompleted: { type: Boolean, default: false },
    tag: { type: String, default: "none" },
  },
  { timestamps: true }
);

const Task = mongoose.model<TaskDocument>("Task", TaskSchema);

export default Task;
