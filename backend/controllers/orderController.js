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
import reservationModel from "../models/reservationModel.js";
// import Razorpay from "razorpay"; // Commented out - not used in current implementation
import 'dotenv/config';
import crypto from "crypto";

// 🔐 Razorpay setup
// const razorpay = new Razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// });

// 🌍 Config variables
const currency = "INR";
const deliveryCharge = 50;
const frontend_URL = "http://localhost:5173"; // Change this to your frontend URL when deployed

// 🧾 Place User Order (Frontend)
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address, tableNumber } = req.body;

        // Check if the table is reserved by the user
        const reservation = await reservationModel.findOne({ userId, tableNo: tableNumber });
        if (!reservation) {
            return res.json({ success: false, message: "Table not reserved by user" });
        }

        // Generate bill number
        const billNumber = `BILL-${Date.now()}`;

        // 1️⃣ Create new order in DB
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address,
            tableNumber,
            billNumber,
        });
        await newOrder.save();

        // 2️⃣ Clear user cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // 3️⃣ Create order in Razorpay
        // const options = {
        //     amount: (amount + deliveryCharge) * 100, // in paise
        //     currency,
        //     receipt: `receipt_${newOrder._id}`,
        // };

        // const razorOrder = await razorpay.orders.create(options);

        // 4️⃣ Send order details to frontend
        res.json({
            success: true,
            orderId: newOrder._id,
            // razorpayOrderId: razorOrder.id,
            // amount: razorOrder.amount,
            // currency: razorOrder.currency,
            // key: process.env.RAZORPAY_KEY_ID, // frontend needs this
            billNumber,
            tableNo: tableNumber,
            items: newOrder.items,
            totalAmount: newOrder.amount,
            status: newOrder.orderStatus,
        });

    } catch (error) {
        console.log("Error in placeOrder:", error);
        res.json({ success: false, message: "Error while placing order" });
    }
};

// 🧾 Verify Payment (called after successful payment)
const verifyOrder = async (req, res) => {
    res.json({ success: true, message: "Payment Verified (Dev Mode) ✅" });
    // try {
    //     const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    //     // 1️⃣ Create expected signature
    //     const generated_signature = crypto
    //         .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    //         .update(razorpay_order_id + "|" + razorpay_payment_id)
    //         .digest("hex");

    //     // 2️⃣ Match signatures
    //     if (generated_signature === razorpay_signature) {
    //         await orderModel.findByIdAndUpdate(orderId, { payment: true });
    //         res.json({ success: true, message: "Payment Verified ✅" });
    //     } else {
    //         await orderModel.findByIdAndDelete(orderId);
    //         res.json({ success: false, message: "Payment Verification Failed ❌" });
    //     }

    // } catch (error) {
    //     console.log("Error in verifyOrder:", error);
    //     res.json({ success: false, message: "Error while verifying order" });
    // }
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

// 📋 Get Order Details by Order ID
const getOrderDetails = async (req, res) => {
    try {
        const order = await orderModel.findById(req.params.orderId);
        if (!order) {
            return res.json({ success: false, message: "Order not found" });
        }
        res.json({ success: true, data: order });
    } catch (error) {
        console.log("Error in getOrderDetails:", error);
        res.json({ success: false, message: "Error fetching order details" });
    }
};

// 🔄 Update Order Info (Status, Waiter)
const updateOrderInfo = async (req, res) => {
    try {
        const { orderId, orderStatus, waiterAssigned } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { orderStatus, waiterAssigned });
        res.json({ success: true, message: "Order Info Updated ✅" });
    } catch (error) {
        console.log("Error in updateOrderInfo:", error);
        res.json({ success: false, message: "Error updating order info" });
    }
};

// 👤 Get User Orders by User ID (GET)
const getUserOrdersById = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.params.userId });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Error in getUserOrdersById:", error);
        res.json({ success: false, message: "Error fetching user orders" });
    }
};

// 📋 Get Orders by Table Number
const getOrdersByTable = async (req, res) => {
    try {
        const orders = await orderModel.find({ tableNumber: req.params.tableNo });
        res.json({ success: true, data: orders });
    } catch (error) {
        console.log("Error in getOrdersByTable:", error);
        res.json({ success: false, message: "Error fetching orders by table" });
    }
};

// 💳 Demo Pay (Simulate Payment)
const demoPay = async (req, res) => {
    try {
        const { orderId } = req.body;

        // Update order payment status to true
        const updatedOrder = await orderModel.findByIdAndUpdate(orderId, { payment: true }, { new: true });

        if (!updatedOrder) {
            return res.json({ success: false, message: "Order not found" });
        }

        res.json({
            success: true,
            message: "Payment simulated for demo",
            order: updatedOrder
        });
    } catch (error) {
        console.log("Error in demoPay:", error);
        res.json({ success: false, message: "Error simulating payment" });
    }
};

// 💳 Fake Payment (Create Order with Payment)
const fakePayment = async (req, res) => {
    try {
        const { userId, items, amount, tableNo } = req.body;

        // Check if the table is reserved by the user
        const reservation = await reservationModel.findOne({ userId, tableNo });
        if (!reservation) {
            return res.json({ success: false, message: "Table not reserved by user" });
        }

        // Generate bill number
        const billNumber = `BILL-${Date.now()}`;

        // Create new order in DB with payment and order status
        const newOrder = new orderModel({
            userId,
            items,
            amount,
            address: { tableNumber: tableNo },
            tableNumber: tableNo,
            billNumber,
            payment: true,
            paymentStatus: "PAID",
            orderStatus: "CONFIRMED"
        });
        await newOrder.save();

        // Clear user cart
        await userModel.findByIdAndUpdate(userId, { cartData: {} });

        // Return success response with order details
        res.json({
            success: true,
            orderId: newOrder._id,
            billNumber,
            paymentStatus: "PAID",
            orderStatus: "CONFIRMED",
            items: newOrder.items,
            totalAmount: newOrder.amount,
            tableNo
        });

    } catch (error) {
        console.log("Error in fakePayment:", error);
        res.json({ success: false, message: "Error processing fake payment" });
    }
};

// 📤 Export all
export { placeOrder, verifyOrder, listOrders, userOrders, updateStatus, getOrderDetails, updateOrderInfo, getUserOrdersById, getOrdersByTable, demoPay, fakePayment };
