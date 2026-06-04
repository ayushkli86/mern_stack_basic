import { Schema,model } from  "mongoose"
let userSchema = Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    address:{
        type:String,
        required:[true,"address is required"]
        
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    phone:{
        type:Number,
        required:[true,"phone no is required"]
    }
});
let User = model("User",userSchema);
export default User;
