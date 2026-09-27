import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  tax: { type: Number, default: 0, min: 0, max: 100 },
  hsnCode: { type: String, default: "", trim: true },
  unit: { type: String, default: "pcs", trim: true },
  stock: { type: Number, default: 0, min: 0 },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
