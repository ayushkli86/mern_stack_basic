import { Router } from "express";
import Product from "../schema/productSchema.js";

const productRoutes = Router();

productRoutes
.route("/")
.get(async (req,res,next)=>{
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (err) {
        next(err);
    }
})
.post(async (req,res,next)=>{
    try {
        const { name, price, quantity, description } = req.body;
        const product = await Product.create({ name, price, quantity, description });
        res.status(201).json(product);
    } catch (err) {
        next(err);
    }
})

productRoutes
.route("/:id")
.get(async (req,res,next)=>{
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        next(err);
    }
})
.patch(async (req,res,next)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json(product);
    } catch (err) {
        next(err);
    }
})
.delete(async (req,res,next)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (err) {
        next(err);
    }
})

export default productRoutes;
