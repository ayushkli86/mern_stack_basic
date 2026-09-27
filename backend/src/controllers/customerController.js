import Customer from "../schema/Customer.js";

export const list = async (req, res) => {
  const { search } = req.query;
  const filter = search
    ? { $or: [{ name: { $regex: search, $options: "i" } }, { phone: { $regex: search, $options: "i" } }] }
    : {};
  const customers = await Customer.find(filter).sort({ createdAt: -1 });
  res.json(customers);
};

export const getById = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ message: "Not found" });
  res.json(customer);
};

export const create = async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(201).json(customer);
};

export const update = async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!customer) return res.status(404).json({ message: "Not found" });
  res.json(customer);
};

export const remove = async (req, res) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};
