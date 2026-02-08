import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId:{type:String,required:true},
    items:{type:Array,required:true},
    amount:{type:Number,required:true},
    address:{type:Object,required:true},
    status:{type:String,default:"Food Processing"},
    date:{type:Date,default:Date.now()},
    payment:{type:Boolean,default:false},
    paymentStatus:{type:String,default:"PENDING"},
    tableNumber:{type:String,required:true},
    orderStatus:{type:String,default:"Pending"},
    waiterAssigned:{type:String,default:""},
    billNumber:{type:String,unique:true}
})


const orderModel = mongoose.models.order || mongoose.model("order",orderSchema)
export default orderModel;