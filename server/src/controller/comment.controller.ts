import { Request, Response } from "express";
import { get } from "lodash";
import { createComment, getPostComments } from "../services/comment.services";
import log from "../logger/logger";

export const createPostCommentController = async (
  req: Request,
  res: Response
) => {
  const id = req.params.id;
  try {
    const newComment = await createComment(req.body, id!);
    log.info(newComment);
    return res.sendStatus(201);
  } catch (error) {
    return res.sendStatus(500);
  }
};
