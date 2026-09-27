import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  name: { type: String, required: true },
  hsnCode: { type: String, default: "" },
  qty: { type: Number, required: true, min: 0 },
  rate: { type: Number, required: true, min: 0 },
  amount: { type: Number, required: true, min: 0 },
  taxPct: { type: Number, default: 0 },
  taxAmt: { type: Number, default: 0 },
  netAmount: { type: Number, default: 0 },
}, { _id: false });

const invoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  dueDate: { type: Date },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  customerName: { type: String, required: true },
  customerPhone: { type: String, default: "" },
  customerAddress: { type: String, default: "" },
  customerGstin: { type: String, default: "" },
  items: [invoiceItemSchema],
  subtotal: { type: Number, default: 0 },
  taxTotal: { type: Number, default: 0 },
  grandTotal: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  roundOff: { type: Number, default: 0 },
  notes: { type: String, default: "" },
  paymentMode: { type: String, enum: ["cash", "card", "upi", "credit", "other"], default: "cash" },
  status: { type: String, enum: ["paid", "unpaid", "cancelled"], default: "paid" },
}, { timestamps: true });

// Auto-generate invoice number
invoiceSchema.statics.generateInvoiceNo = async function () {
  const count = await this.countDocuments();
  const date = new Date();
  const prefix = `INV-${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}`;
  return `${prefix}-${String(count + 1).padStart(4, "0")}`;
};

export default mongoose.model("Invoice", invoiceSchema);
