import express from "express"
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
app.get("/",(req,res,next)=>{

    console.log("b");
});
app.patch("/",(req,res,next)=> {

    console.log("c");
});
app.delete("/",(req,res,next)=>{

    console.log("d");
});