import Product from "../schema/Product.js";

export const list = async (req, res) => {
  const { search } = req.query;
  const filter = search
    ? { name: { $regex: search, $options: "i" } }
    : {};
  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
};

export const getById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};

export const create = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};

export const update = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
};

export const remove = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json({ message: "Deleted" });
};
