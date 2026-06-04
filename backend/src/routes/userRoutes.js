import { Router } from "express";
import User from "../schema/userSchema.js";

let userRoutes = Router();
userRoutes
.route("/")
.get(async(req,res,next)=>{
    try {
        let result =await User.find()
        res.json({
            success:true,
            message:"here are your users",
            result:result,

        })
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message,
        })
        
    }
})
.post(async(req,res,next)=>{
    try {
    let result =await User.create(req.body)
    res.json({
    success:true,
    message:"user created sucussfully",
    result :result,
})
        
} catch (error) {
res.json({
    success:false,
    message:error.message,
    
})
        
    }


});

userRoutes
.route("/:id")
.get(async(req,res,next)=>{
    try {
        let result =await User.findById(req.params.id);
    res.json({
        success:true,
        message:"user has been found",
        result:result,
    });
        
    } catch (error) {
       res.json({
        success:false,
        message:error.message,
       })
        
    }
})
.patch(async(req,res,next)=>{
    try {
        let result =await User.findByIdAndUpdate    (req.params.id,req.body)
        res.json({
            sucess:true,
            message:"user has been patched successfully",
            result:result
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message

        })
        
    }
})
.delete(async(req,res,next)=>{
    try {
        let result = await User.findByIdAndDelete(req.params.id);
        res.json({
            success:true,
            message:"user has been deleted",
            result:result
        })
        
    } catch (error) {
        res.json({
            success:false,
            message:error.message,
        })
        
    }
});

export default userRoutes;