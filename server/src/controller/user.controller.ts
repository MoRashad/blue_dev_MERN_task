import { Request, Response } from "express";
import { createUser } from "../services/user.services";
import log from "../logger/logger";
import { omit } from "lodash";

export const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUser(req.body);
    log.info(user);
    return res.status(201).json(omit(user.toJSON(), "password"));
  } catch (error) {
    log.error(error);
    return res.status(409).send("Email already in use");
  }
};
