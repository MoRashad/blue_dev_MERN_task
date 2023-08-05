import express from "express";
import { requireUser } from "../middleware/requireUser.middleware";
import { createPostCommentController } from "../controller/comment.controller";
import { validateRequest } from "../middleware/validateRequest.middleware";
import { createCommentSchema } from "../schema/comment.schema";

const router = express.Router();

router.post(
  "/comment/tasks/:id",
  requireUser,
  validateRequest(createCommentSchema),
  createPostCommentController
);
// router.get("post/:id/comments", requireUser, getPostCommentsController);

export default router;
