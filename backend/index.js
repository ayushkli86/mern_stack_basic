import express, { json } from "express"
import firstRoutes from "./src/routes/FirststRoutes.js";
import productRoutes from "./src/routes/productsRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import customerRoutes from "./src/routes/customerRoutes.js";
import productBillingRoutes from "./src/routes/productRoutes.js";
import invoiceRoutes from "./src/routes/invoiceRoutes.js";
import mongoose from "mongoose";
import cors from "cors";

let app = express();
app.use(cors());
app.use(json());

// Existing routes
app.use(firstRoutes);
app.use("/product", productRoutes);
app.use("/user", userRoutes);

// Billing routes
app.use("/api/customers", customerRoutes);
app.use("/api/products", productBillingRoutes);
app.use("/api/invoices", invoiceRoutes);

app.listen(8000, () => {
  console.log("🚀 Billing server on port 8000");
  mongoose.connect("mongodb://localhost:27017/cosmos");
});
