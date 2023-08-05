import "dotenv/config";

const config = {
  DB_UR: process.env.DB_URL,
  PORT: process.env.PORT,
  SALT_FACTOR: process.env.SALT_FACTOR as unknown as number,
  ACCESS_TOKEN_EXP_TIME: (process.env.ACCESS_TOKEN_EXP_TIME || "60m") as string,
  ACCESS_TOKEN_SECRET: (process.env.ACCESS_TOKEN_SECRET ||
    "AccessTokenSecret") as string,
  REFRESH_TOKEN_EXPIRE_TIME: (process.env.REFRESH_TOKEN_EXPIRE_TIME ||
    "1y") as string,
  REFRESH_TOKEN_SECRET: (process.env.REFRESH_TOKEN_SECRET ||
    "refreshTokenSecret") as string,
};

export default config;
