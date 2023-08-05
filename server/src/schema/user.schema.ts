import { object, string } from "yup";

export const createUserSchema = object({
  body: object({
    email: string().email("Must be valid email").required("Email is required"),
    password: string()
      .required("password is required")
      .min(6, "password is too short, should be minimum of 6 characters"),
  }),
});

export const userSessionSchema = object({
  body: object({
    email: string().email(),
  }),
});
