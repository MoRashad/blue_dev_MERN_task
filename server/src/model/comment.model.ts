import mongoose, { mongo } from "mongoose";

export interface CommentDocument extends mongoose.Document {
  user: string;
  comment: string;
}

const CommentSchema = new mongoose.Schema(
  {
    task: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    user: { type: String, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const Comment = mongoose.model<CommentDocument>("Comments", CommentSchema);

export default Comment;
