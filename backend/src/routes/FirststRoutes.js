//make routes 
//use that  routesa at index.js

import { Router } from "express";

let firstRoutes = Router()
firstRoutes
.route("/")
.get((req,res,next)=>{
    console.log(req.body);
    console.log("a");
})
.post((req,res,next)=>{
    cosole.log("b")
});
firstRoutes
.route("/:id")//localhost:8000/j name haleni vayo 
.get((req,res,next)=>{

    console.log("dynamic api names")
})
firstRoutes
.route("/:id/a/:id2")//localhost:8000/ayush/a/katuwal
.get((req,res,next)=>{

    console.log("dynamic api names")
    console.log(req.params)
})
.post((req,res,next)=>{
    console.log("here are your contacts")
})

export default firstRoutes;
/* 
 api bnaune aba */

 /* dynamic parents  :halesi j haleni hunxa api ko name  */



