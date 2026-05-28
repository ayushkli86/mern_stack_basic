import express from "express"
import firstRoutes from "./src/routes/FirststRoutes.js";
let app = express();

app.listen(8000,()=>{

    console.log("application  is listeing on port  8000");
});

//databse operation 
//create,post 
//read,get 
// update,patch 
// delete, delete
app.post("/",(req,res,next)=> {

    console.log("a");
});

app.use(firstRoutes);