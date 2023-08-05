import { object, string } from "yup";

export const createCommentSchema = object({
  body: object({
    user: string().email("Must be valid email").required("Email is required"),
    comment: string()
      .min(1, "comment is to short")
      .required("comment is required"),
  }),
});
