import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../helpers/jwt.helper";
import { reIssueNewAccessToken } from "../services/session.services";
import log from "../logger/logger";
import { get } from "lodash";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, "headers.authorization", "").replace(
    /^Bearer\s/,
    ""
  );

  const refreshToken = get(req, "headers.refresh_token") as string;
  if (!accessToken) return next();

  const { verified, expired } = await verifyToken(accessToken);

  if (verified) {
    // @ts-ignore
    req.user = verified;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueNewAccessToken({ refreshToken });
    if (newAccessToken) {
      res.setHeader("access-token", newAccessToken);
      const { verified } = await verifyToken(newAccessToken);
      // @ts-ignore
      req.user = verified;
    }
    return next();
  }
  return next();
};
