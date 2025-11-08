import { Product } from "../models/productModel.js";

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find(
      {},
      "productName productPrice productType discountPrice variants",
    ).lean();
    if (!products) {
      return res.json({ message: "No data found", success: false });
    }
    const formattedProducts = products.map((p) => {
      const defaultImage = p.variants?.[0]?.productImage?.[0] || null;
      return {
        _id: p._id,
        name: p.productName,
        price: p.productPrice,
        discount: p.discountPrice,
        type: p.productType,
        thumbnail: defaultImage,
      };
    });
    return res
      .json({
        message: "All product are found",
        success: true,
        formattedProducts,
      })
      .status(200);
  } catch (err) {
    console.log(`Error in getting product Data: ${err} `);
    return res
      .json({ message: "Internal Server Erros", success: false })
      .status(500);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({ message: "Product Id is required" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.json({ message: "No product details found", success: false });
    }
    return res.json({ success: true, product }).status(200);
  } catch (err) {
    console.log(`Error in Finding Product Details ${err}`);
    return res.json({ message: "Internal Server Error" });
  }
};
