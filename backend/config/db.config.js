import mongoose from "mongoose";
import { envConfig } from "./env.config.js";
const dbURL = envConfig.mongoDBUrl;
export const dbConnect = async () => {
  await mongoose
    .connect(dbURL)
    .then(() => {
      console.log("DB connected");
    })
    .catch((err) => console.log(`Error in db connection: ${err}`));
};
