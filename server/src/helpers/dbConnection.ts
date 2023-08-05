import mongoose from "mongoose";
import config from "../config";
import log from "../logger/logger";

const dbUrl = config.DB_UR as string;

const connectToDb = async () => {
  try {
    const conn = await mongoose.connect(dbUrl);
    log.info(`mongoDb connected ${conn.connection.host}`);
  } catch (error) {
    log.error(error.message);
    process.exit(1);
  }
};

export default connectToDb;
