import { Router } from "express";

const productRoutes = Router();

productRoutes
.route("/")
.get((req,res,next)=>{
    console.log("this is the product get api ");
})
.post((req,res,next)=>{
    res.json("product is created successfully");
})

productRoutes
.route("/:id")
.get((req,res,next)=>{})
.patch((req,res,next)=>{})
.delete((req,res,next)=>{})

export default productRoutes;
