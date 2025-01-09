import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import app from "../app";
import { error } from "console";

const CONNECTION_URL: string = process.env.CONNECTION_URL!;

const connect = async () => {
  try {
    await mongoose.connect(CONNECTION_URL);
    app.emit("db ready");
    console.log("MongoDB connected successfully!");
  } catch (err) {
    console.error("Error connecting with Database:", err);
    process.exit(1);
  }
};

export default connect;
