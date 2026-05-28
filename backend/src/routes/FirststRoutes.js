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
.route("/job")
.get((req,res,next)=>{

    console.log("here are your  jobs")
})
.post((req,res,next)=>{
    console.log("here are your contacts")
})

export default firstRoutes;
/* 
 api bnaune aba */

