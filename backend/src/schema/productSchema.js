import { Schema,model } from "mongoose";
let productSchema = Schema({
 name :{
    type:String,
    required:[true,"name is required"]
 },
 price:{
    type:Number,
    required:[true,"price is required"]
 },
 quantity:{
    type:Number,
    required:[true,"quantity is required"]
 },
 description:{
    type:String
 }

});

let Product = model("product",productSchema)
export default Product;
