import Router from "express";
import { getAllProduct, getProductById } from "../controller/productController.js";
const productRouter = Router();

productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductById);

export default productRouter;
