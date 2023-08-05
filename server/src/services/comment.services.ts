import log from "../logger/logger";
import Comment, { CommentDocument } from "../model/comment.model";

export const createComment = async (
  comment: CommentDocument,
  taskId: string
) => {
  try {
    const newComment = await Comment.create({ ...comment, task: taskId });
    return newComment.toJSON();
  } catch (error) {
    log.error(error);
    throw new Error(error);
  }
};

export const getPostComments = async (taskId: string) => {
  try {
    const comments = await Comment.find({ task: taskId });
    return comments;
  } catch (error) {
    log.error(error);
    throw new Error(error);
  }
};
