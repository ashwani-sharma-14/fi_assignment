import express from "express";
import { dbConnect } from "./config/db.config.js";
import { envConfig } from "./config/env.config.js";
import productRouter from "./routes/productRoute.js";
import cors from "cors";
const app = express();

const port = envConfig.port;
app.use(
  cors({
    origin: ["http://localhost:3000"],
  }),
);
app.use("/product", productRouter);
app.get("/", (req, res) => {
  return res.json({ message: "Server is workin fine" });
});
app.listen(port, async () => {
  console.log(`server is listining at port: ${port} `);
  await dbConnect();
});
