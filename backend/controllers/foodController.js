import foodModel from "../models/foodModel.js";
import fs from 'fs'

const addFood = async (req,res)  => {
    let image_filename = req.file.filename || "default.jpg";

    const food = new foodModel({
        name : req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })

    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

//all food list
const listFood = async ( req,res) => {
    try{
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}


//remove food item 
const removeFood = async (req, res) => {
    try {
        const foodId = req.body.id; // <- get id from URL
        if (!foodId) {
            return res.status(400).json({ success: false, message: "Food ID is required" });
        }

        const food = await foodModel.findById(foodId);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        // remove image file
        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.log("Failed to delete image:", err);
        });

        await foodModel.findByIdAndDelete(foodId);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};

export {addFood,listFood,removeFood} 