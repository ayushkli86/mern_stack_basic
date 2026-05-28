import express, { json } from "express"
import firstRoutes from "./src/routes/FirststRoutes.js";
let app = express();

app.listen(8000,()=>{

    console.log("application  is listeing on port  8000");
});
app.use(json());//makes our backend to take data from postman 

//databse operation 
//create,post 
//read,get 
// update,patch 
// delete, delete
app.post("/",(req,res,next)=> {

    console.log("a");
});

app.use(firstRoutes);