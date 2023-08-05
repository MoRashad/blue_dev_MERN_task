import {
  Document,
  FilterQuery,
  HydratedDocument,
  SortOrder,
  SortValues,
  UpdateQuery,
} from "mongoose";
import Task, { TaskDocument } from "../model/task.model";
import log from "../logger/logger";

export const createNewTask = async (
  input: HydratedDocument<TaskDocument>,
  userId: string
) => {
  try {
    const task = await Task.create({ user: userId, ...input });
    return task.toJSON();
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllUserTasks = async (
  user: string,
  page: number,
  limit: number,
  sort: [string, SortOrder],
  filterBy: string,
  filterValue: string
) => {
  try {
    let query = Task.find({ user: user });

    // Apply filter if filterBy and filterValue are provided
    if (filterBy && filterValue) {
      // Construct the filter object dynamically using bracket notation
      const filterObject = { [filterBy]: filterValue };
      query = query.where(filterObject);
    }

    // Continue with sorting, pagination, and execution as before
    const tasks = await query
      .limit(limit)
      .sort([sort])
      .skip((page - 1) * limit)
      .exec();

    return tasks;
  } catch (error) {
    log.error(error);
    throw new Error(error);
  }
};

export const getTotalTasksForUser = async (user: string) => {
  try {
    const count = await Task.count().where({ user: user });
    return count;
  } catch (error) {
    log.error(error);
    throw new Error(error);
  }
};

export const getTaskById = async (id: string) => {
  try {
    const task = await Task.findById(id);
    return task;
  } catch (error) {
    log.info(error);
    throw new Error(error);
  }
};

export const updateTask = async (
  query: FilterQuery<TaskDocument>,
  update: UpdateQuery<TaskDocument>
) => {
  return Task.updateOne(query, update);
};

export const deleteTask = async (query: FilterQuery<TaskDocument>) => {
  return Task.deleteOne(query);
};
