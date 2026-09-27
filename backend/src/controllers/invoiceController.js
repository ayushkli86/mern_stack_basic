import Invoice from "../schema/Invoice.js";

export const list = async (req, res) => {
  const { page = 1, limit = 20, status, startDate, endDate } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }
  const total = await Invoice.countDocuments(filter);
  const invoices = await Invoice.find(filter)
    .populate("customer", "name phone")
    .sort({ createdAt: -1 })
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json({ invoices, total, page: parseInt(page), pages: Math.ceil(total / limit) });
};

export const getById = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id).populate("customer", "name phone address gstin");
  if (!invoice) return res.status(404).json({ message: "Not found" });
  res.json(invoice);
};

export const create = async (req, res) => {
  const invoiceNo = await Invoice.generateInvoiceNo();
  const invoice = await Invoice.create({ ...req.body, invoiceNo });
  res.status(201).json(invoice);
};

export const update = async (req, res) => {
  const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!invoice) return res.status(404).json({ message: "Not found" });
  res.json(invoice);
};

export const remove = async (req, res) => {
  const invoice = await Invoice.findByIdAndDelete(req.params.id);
  if (!invoice) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};

export const dashboard = async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    totalInvoices,
    totalCustomers,
    totalProducts,
    todayInvoices,
    todayRevenue,
    recentInvoices,
    monthlyData,
  ] = await Promise.all([
    Invoice.countDocuments(),
    (await import("../schema/Customer.js")).default.countDocuments(),
    (await import("../schema/Product.js")).default.countDocuments(),
    Invoice.countDocuments({ date: { $gte: today, $lt: tomorrow } }),
    Invoice.aggregate([
      { $match: { date: { $gte: today, $lt: tomorrow }, status: "paid" } },
      { $group: { _id: null, total: { $sum: "$grandTotal" } } },
    ]),
    Invoice.find().sort({ createdAt: -1 }).limit(5).populate("customer", "name"),
    Invoice.aggregate([
      { $match: { status: "paid" } },
      { $group: { _id: { $month: "$date" }, count: { $sum: 1 }, revenue: { $sum: "$grandTotal" } } },
      { $sort: { _id: 1 } },
    ]),
  ]);

  res.json({
    totalInvoices,
    totalCustomers,
    totalProducts,
    todayInvoices,
    todayRevenue: todayRevenue[0]?.total || 0,
    recentInvoices,
    monthlyData,
  });
};
