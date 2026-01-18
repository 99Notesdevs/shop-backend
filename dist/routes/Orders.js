"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_1 = require("../controllers/order");
const authenticateMiddleware_1 = require("../middlewares/authenticateMiddleware");
const authorizeRoles_1 = require("../middlewares/authorizeRoles");
const orderRouter = (0, express_1.default)();
orderRouter.get("/", order_1.OrderController.getAllOrders);
orderRouter.get("/:id", order_1.OrderController.getOrderById);
orderRouter.get('/track/:id', order_1.OrderController.trackOrder);
orderRouter.get('/user/:userId', order_1.OrderController.getUserOrders);
orderRouter.post("/", authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), order_1.OrderController.createOrder);
orderRouter.put("/:id", order_1.OrderController.updateOrder);
orderRouter.put("/status/:id", order_1.OrderController.updateOrderStatus);
orderRouter.delete("/:id", order_1.OrderController.deleteOrder);
exports.default = orderRouter;
