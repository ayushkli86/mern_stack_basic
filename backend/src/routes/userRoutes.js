import { Router } from "express";

let userRoutes = Router();
userRoutes
.route("/")
.get((req,res,next)=>{})
.post((req,res,next)=>{
    res.json("this is the  user api ,user created sucussfully")
})

userRoutes
.route("/:id")
.get((req,res,next)=>{})
.patch((req,res,next)=>{})
.delete((req,res,next)=>{});

export default userRoutes;