import { Product } from "../models/productModel.js";
import { dbConnect } from "../config/db.config.js";
import fs from "fs";
const parameters = JSON.parse(
  fs.readFileSync(`./constants/data.json`, "utf-8"),
);
const importData = async () => {
  try {
    await dbConnect();
    await Product.create(parameters);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await dbConnect();
    await Product.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.error(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
