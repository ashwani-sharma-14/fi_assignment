import mongoose, { Schema} from "mongoose";
const VariantSchema = new Schema({
  productColour: { type: String },
  productImage: [{ type: String }],
});
const EMISchema = new Schema({
  durationMonths: { type: Number, required: true },
  monthlyAmount: { type: Number, required: true },
  interestRate: { type: Number, required: true, default: 0 },
  cashback: { type: Number, default: 0 },
});
const ProductSchema = new Schema(
  {
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productType: { type: String, required: true },
    description: { type: String },
    variants: [VariantSchema],
    emiPlans: [EMISchema],
    discountPrice: { type: Number },
  },
  { timestamps: true },
);
export const Product = mongoose.model("Product", ProductSchema);
