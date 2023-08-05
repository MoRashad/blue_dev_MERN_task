import express from "express";
import { requireUser } from "../middleware/requireUser.middleware";
import {
  createNewTaskController,
  deleteTaskController,
  getTaskByIdController,
  getTasksController,
  updateTaskController,
} from "../controller/task.controller";
import { validateRequest } from "../middleware/validateRequest.middleware";
import { createTaskSchema } from "../schema/task.schema";

const router = express.Router();

router.post(
  "/tasks",
  requireUser,
  validateRequest(createTaskSchema),
  createNewTaskController
);
router.get("/tasks", requireUser, getTasksController);
router.get("/tasks/:id", requireUser, getTaskByIdController);
router.put("/tasks/:id", requireUser, updateTaskController);
router.delete("/tasks/:id", requireUser, deleteTaskController);

export default router;
