// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";

// import stripe from "stripe"

// //placing user order from frontend
// const placeOrder = async(req,res) => {

//     try{
//         const newOrder = new orderModel({
//             userId:req.body.userId,
//             items:req.body.items,
//             amount:req.body.amount,
//             address:req.body.address
//         })

//         await newOrder.save();
//         await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

//         const line_items = req.body.items.map(() => ({
//             price_data : {
//                 currency:"inr",
//                 product_data:{
//                     name:item.name
//                 },
//                 unit_amount:item.price*100*80
//             },
//             quantity:item.quantity
//         }))

//         line_items.push({
//             price_data:{
//                 currency:"inr",
//                 product_data:{
//                     name:"Delivery Charges"
//                 },
//                 unit_amount:2*100*80
//             },
//             quantity:1
//         })

//         const session = await stripe.Checkout.seesions.create({})
//     }
// }

// export {placeOrder}




// import orderModel from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Razorpay from "razorpay";
// import crypto from "crypto";

// // Initialize Razorpay instance
// const razorpay = new Razorpay({
//     key_id: "rzp_test_RR1AMbrFdXuvBc",
//     key_secret: "f7pWuvERtqcIEOmcgf8Y1pKb"
// });

// // Place user order
// const placeOrder = async (req, res) => {
//     try {
//         const { userId, items, amount, address } = req.body;

//         // 1️⃣ Save the order in MongoDB
//         const newOrder = new orderModel({
//             userId,
//             items,
//             amount,
//             address
//         });
//         await newOrder.save();

//         // 2️⃣ Clear user's cart
//         await userModel.findByIdAndUpdate(userId, { cartData: {} });

//         // 3️⃣ Create Razorpay order
//         const options = {
//             amount: amount * 100, // Amount in paise
//             currency: "INR",
//             receipt: `order_rcptid_${newOrder._id}`,
//         };

//         const razorpayOrder = await razorpay.orders.create(options);

//         // 4️⃣ Send order details to frontend
//         res.status(200).json({
//             success: true,
//             order: razorpayOrder,
//             orderId: newOrder._id
//         });

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: "Something went wrong" });
//     }
// };

// export { placeOrder };




import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// 🔐 Razorpay setup
const razorpay = new Razorpay({
    key_id: "rzp_test_RR1AMbrFdXuvBc",      // ⚠️ Replace with your Razorpay test key_id
    key_secret: "f7pWuvERtqcIEOmcgf8Y1pKb"  // ⚠️ Replace with your Razorpay test key_secret
});

// 🌍 Config variables
const currency = "INR";
const deliveryCharge = 50;
const frontend_URL = "http://localhost:5173"; // Change this to your frontend URL when deployed

// 🧾 Place User Order (Frontend)
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        // 1️⃣ Create new order in DB
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
        });
        await newOrder.save();

        // 2️⃣ Clear user cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // 3️⃣ Create order in Razorpay
        const options = {
            amount: (amount + deliveryCharge) * 100, // in paise
            currency,
            receipt: `receipt_${newOrder._id}`,
        };

        const razorOrder = await razorpay.orders.create(options);

        // 4️⃣ Send order details to frontend
        res.json({
            success: true,
            orderId: newOrder._id,
            razorpayOrderId: razorOrder.id,
            amount: razorOrder.amount,
            currency: razorOrder.currency,
            key: "rzp_test_RR1AMbrFdXuvBc", // frontend needs this
        });

    } catch (error) {
        console.log("Error in placeOrder:", error);
        res.json({ success: false, message: "Error while placing order" });
    }
};

// 🧾 Verify Payment (called after successful payment)
const verifyOrder = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

        // 1️⃣ Create expected signature
        const generated_signature = crypto
            .createHmac("sha256", "f7pWuvERtqcIEOmcgf8Y1pKb")
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        // 2️⃣ Match signatures
        if (generated_signature === razorpay_signature) {
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            res.json({ success: true, message: "Payment Verified ✅" });
        } else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment Verification Failed ❌" });
        }

    } catch (error) {
        console.log("Error in verifyOrder:", error);
        res.json({ success: false, message: "Error while verifying order" });
    }
};

// 📋 List Orders (for Admin Panel)
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Error in listOrders:", error);
        res.json({ success: false, message: "Error fetching orders" });
    }
};

// 👤 User Orders (Frontend)
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Error in userOrders:", error);
        res.json({ success: false, message: "Error fetching user orders" });
    }
};

// 🔄 Update Order Status (Admin)
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated ✅" });
    } catch (error) {
        console.log("Error in updateStatus:", error);
        res.json({ success: false, message: "Error updating status" });
    }
};

// 📤 Export all
export { placeOrder, verifyOrder, listOrders, userOrders, updateStatus };
