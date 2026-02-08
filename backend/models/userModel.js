import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:false},
    password:{type:String,required:false},
    phone: {type:String,required:false,unique:true},
    cartData:{type:Object,default:{}}
},{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema);
export default userModel;