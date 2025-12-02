import userModel from "../models/userModel.js"

// add items to userCart
const addToCart = async(req,res) => {
    const { userId, itemId } = req.body;

        // Make sure itemId exists
        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "User ID or Item ID missing" });
        }

    try{
        let userData = await userModel.findOne({_id:req.body.userId});
        let cartData = await userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1
        }

        else{
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Added To Cart"})
    }

    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove items from user cart
const removeFromCart = async (req,res) => {
    const { userId, itemId } = req.body;

        if (!userId || !itemId) {
            return res.status(400).json({ success: false, message: "User ID or Item ID missing" });
        }

    try{
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Remove from Cart"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//fetch user cart data
const getCart = async(req,res) => {
    try{
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: "User ID missing" });
        }

        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
} 


export {addToCart,removeFromCart,getCart};