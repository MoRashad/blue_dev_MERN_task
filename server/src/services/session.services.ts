import { sign } from "jsonwebtoken";
import Session, { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import config from "../config";
import { string } from "yup";
import { verifyToken } from "../helpers/jwt.helper";
import { get } from "lodash";
import { findUser } from "./user.services";
import { FilterQuery, UpdateQuery } from "mongoose";

export const createSession = async (userId: string, userAgent: string) => {
  const session = await Session.create({ user: userId, userAgent });
  return session.toJSON();
};

export const createAccessToken = ({
  user,
  session,
}: {
  user: Omit<UserDocument, "password">;
  session: Omit<SessionDocument, "password">;
}) => {
  const accessToken = sign(
    { ...user, session: session._id },
    config.ACCESS_TOKEN_SECRET,
    {
      expiresIn: config.ACCESS_TOKEN_EXP_TIME,
    }
  );

  return accessToken;
};

export const createRefreshToken = async (
  session: Omit<SessionDocument, "password">
) => {
  const refreshToken = sign({ session }, config.REFRESH_TOKEN_SECRET, {
    expiresIn: config.REFRESH_TOKEN_EXPIRE_TIME,
  });

  return refreshToken;
};

export const reIssueNewAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { verified } = await verifyToken(refreshToken);
  if (!verified) return false;
  const session = await Session.findById(get(verified, "_id"));
  if (!session || !session.isValid) return false;
  const user = await findUser({ _id: session.user });
  if (!user) return false;
  const accessToken = createAccessToken({ user, session });
  return accessToken;
};

export async function updateSession(
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) {
  return Session.updateOne(query, update);
}
