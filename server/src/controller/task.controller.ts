import { Request, Response } from "express";
import {
  createNewTask,
  deleteTask,
  getAllUserTasks,
  getTaskById,
  getTotalTasksForUser,
  updateTask,
} from "../services/task.services";
import { get } from "lodash";
import log from "../logger/logger";
import { HydratedDocument, SortOrder } from "mongoose";
import { getPostComments } from "../services/comment.services";
import { CommentDocument } from "../model/comment.model";

export const createNewTaskController = async (req: Request, res: Response) => {
  try {
    const userId = get(req, "user._id");
    const task = await createNewTask(req.body, userId!);
    return res.status(201).send(task);
  } catch (error) {
    log.error(error);
    return res.status(500).send(error);
  }
};

export const getTasksController = async (req: Request, res: Response) => {
  try {
    const page = (req.query.page || 1) as number;
    const limit = (req.query.limit || 10) as number;
    const user = get(req, "user._id");
    let orderParameter: SortOrder | undefined;
    if (req.query.sortBy === "dueDate") {
      orderParameter = req.query.order === "desc" ? -1 : 1;
    } else {
      orderParameter = req.query.order === "false" ? 1 : -1;
    }
    const filterBy = req.query.filterBy as string;
    const filterValue = req.query.value as string;
    const sort: [string, SortOrder] = [`${req.query.sortBy}`, orderParameter];
    const tasks = await getAllUserTasks(
      user!,
      page,
      limit,
      sort,
      filterBy,
      filterValue
    );
    const totalTasks = await getTotalTasksForUser(user!);
    const lastPage = Math.ceil(totalTasks / limit);
    if (!tasks || tasks.length === 0)
      return res.status(404).send("no tasks found");
    return res.status(200).send({ page, limit, totalTasks, lastPage, tasks });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
export const getTaskByIdController = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const task = await getTaskById(id);
    if (!task) return res.status(404).send("task not found");
    let taskComments: HydratedDocument<CommentDocument>[] | string =
      await getPostComments(id);
    if (!taskComments || taskComments.length === 0)
      taskComments = "no comments yet";
    return res.status(200).send({ task, taskComments });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
export const updateTaskController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const task = await updateTask({ _id: id }, req.body);
    if (task.modifiedCount === 0)
      return res.status(404).send("error updating task");
    return res.status(200).send(task);
  } catch (error) {
    return res.send(500).send(error);
  }
};
export const deleteTaskController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const task = await deleteTask({ _id: id });
    if (task.deletedCount === 0)
      return res.status(404).send("error deleting task");
    return res.status(200).send(task);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};
