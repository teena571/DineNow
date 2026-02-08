import express from "express"
import authMiddleware from "../middleware/auth.js"

import {
    placeOrder,
    verifyOrder,
    userOrders,
    listOrders,
    updateStatus,
    getOrderDetails,
    updateOrderInfo,
    getUserOrdersById,
    getOrdersByTable,
    demoPay,
    fakePayment
} from "../controllers/orderController.js"

const orderRouter = express.Router();

// --- User-facing Routes ---
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/userorders", authMiddleware, userOrders);
orderRouter.get("/user/:userId", getUserOrdersById);

// --- Payment & Verification Routes ---
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/demopay", authMiddleware, demoPay); // Corrected path and added auth
orderRouter.post("/fake-payment", authMiddleware, fakePayment);

// --- Admin & Staff Routes ---
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus); // For updating order status (e.g., "Food is preparing")
orderRouter.get("/table/:tableNo", getOrdersByTable);
orderRouter.get("/:orderId", getOrderDetails); // Get details for a single order by its ID

export default orderRouter;
