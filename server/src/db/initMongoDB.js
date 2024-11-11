import mongoose from "mongoose";

import { env } from "../utils/index.js";

const initMongoDB = async () => {
  const DB_HOST = env("DB_HOST");

  try {
    await mongoose.connect(DB_HOST);

    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    throw error;
  }
};

export default initMongoDB;
