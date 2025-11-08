import { configDotenv } from "dotenv";
configDotenv();
export const envConfig = {
  port: process.env.PORT,
  mongoDBUrl: process.env.DB_URL,
  frontendUrl: process.env.frontendUrl,
};
