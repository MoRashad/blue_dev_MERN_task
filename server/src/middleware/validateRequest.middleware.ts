import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";
import log from "../logger/logger";

export const validateRequest =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error) {
      log.error(error);
      return res.status(400).send(error);
    }
  };
