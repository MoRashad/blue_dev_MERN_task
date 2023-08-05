import jwt from "jsonwebtoken";
import config from "../config";
import log from "../logger/logger";

export const verifyToken = async (token: string) => {
  try {
    const verify = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
    return { valid: true, expired: false, verified: verify };
  } catch (error) {
    log.error(error);
    return {
      valid: false,
      expired: error.message === "jwt expired",
      verified: null,
    };
  }
};
