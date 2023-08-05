import express from "express";
import { createUserController } from "../controller/user.controller";
import {
  createUserSessionController,
  invalidateUserSessionController,
} from "../controller/session.controller";
import { validateRequest } from "../middleware/validateRequest.middleware";
import { createUserSchema } from "../schema/user.schema";
import { requireUser } from "../middleware/requireUser.middleware";

const router = express.Router();

router.post("/user", validateRequest(createUserSchema), createUserController);

router.post(
  "/session",
  validateRequest(createUserSchema),
  createUserSessionController
);

router.delete("/session", requireUser, invalidateUserSessionController);

export default router;
