import { Request, Response } from "express";
import { validateUser } from "../services/user.services";
import {
  createAccessToken,
  createRefreshToken,
  createSession,
  updateSession,
} from "../services/session.services";
import log from "../logger/logger";
import { get } from "lodash";
export const createUserSessionController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await validateUser(req.body);

    if (!user) return res.status(401).send("invalid email or password");

    const session = await createSession(user._id, req.get("user-agent") || "");

    const accessToken = createAccessToken({ user, session });
    const refreshToken = await createRefreshToken(session);
    log.info("new session");
    return res.status(200).send({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const invalidateUserSessionController = async (
  req: Request,
  res: Response
) => {
  const sessionId = get(req, "user.session");
  await updateSession({ _id: sessionId }, { valid: false });
  return res.status(200).send("user logged out");
};
