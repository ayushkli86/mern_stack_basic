import express, { json } from "express"
import firstRoutes from "./src/routes/FirststRoutes.js";
import productRoutes from "./src/routes/productsRoutes.js";
import userRoutes from "./src/routes/userRoutes.js";
import mongoose from "mongoose";
let app = express();

app.listen(8000,()=>{

    console.log("application  is listeing on port  8000");
    mongoose.connect("mongodb://localhost:27017");
});
app.use(json());//makes our backend to take data from postman 

//databse operation 
//create,post 
//read,get 
// update,patch 
// delete, delete

app.use(firstRoutes);
app.use("/product",productRoutes);
app.use("/user",userRoutes);
