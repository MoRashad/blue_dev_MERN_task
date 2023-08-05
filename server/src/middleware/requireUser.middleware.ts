import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import log from "../logger/logger";

export const requireUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = get(req, "user");
  log.info(user);
  if (!user) return res.status(403).send("authurization required");
  return next();
};
