import { object, string, date, boolean } from "yup";

export const createTaskSchema = object({
  body: object({
    taskName: string()
      .required("task name is required")
      .min(2, "task name should be minimum of 2 characters"),
    description: string(),
    dueDate: date().required("date is required"),
    isCompleted: boolean(),
    tag: string(),
  }),
});
