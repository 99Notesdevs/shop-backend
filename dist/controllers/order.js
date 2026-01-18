"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const OrderService_1 = require("../services/OrderService");
const logger_1 = __importDefault(require("../utils/logger"));
class OrderController {
    // Get all orders
    static getAllOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield OrderService_1.OrderService.getAllOrders();
                logger_1.default.info("Orders retrieved successfully");
                res.status(200).json({ success: true, data: orders });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in getAllOrders controller", error.message);
                    res.status(500).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in getAllOrders controller");
                    res.status(500).json({ success: false, message: "Something went wrong in getAllOrders" });
                }
            }
        });
    }
    // Get an order by ID
    static getOrderById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const order = yield OrderService_1.OrderService.getOrderById(Number(id));
                if (!order) {
                    logger_1.default.warn("Order not found", { orderId: id });
                    throw new Error("Order not found");
                }
                logger_1.default.info("Order retrieved successfully", { orderId: id });
                res.status(200).json({ success: true, data: order });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in getOrderById controller", error.message);
                    res.status(500).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in getOrderById controller");
                    res.status(500).json({ success: false, message: "Something went wrong in getOrderById" });
                }
            }
        });
    }
    // Get user orders
    static getUserOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.params;
                const orders = yield OrderService_1.OrderService.getUserOrders(Number(userId));
                logger_1.default.info("User orders retrieved successfully", { userId });
                res.status(200).json({ success: true, data: orders });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in getUserOrders controller", error.message);
                    res.status(500).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in getUserOrders controller");
                    res.status(500).json({ success: false, message: "Something went wrong in getUserOrders" });
                }
            }
        });
    }
    // Create a new order
    static createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderData = req.body;
                const data = {
                    orderDate: new Date(orderData.orderDate),
                    products: orderData.products,
                    totalAmount: parseFloat(orderData.totalAmount),
                    status: orderData.status,
                    userId: parseInt(req.authUser) || parseInt(orderData.userId),
                    billingAddressId: orderData.billingAddressId,
                    shippingAddressId: orderData.shippingAddressId
                };
                const newOrder = yield OrderService_1.OrderService.createOrder(data);
                logger_1.default.info("Order created successfully", { orderId: newOrder.id });
                res.status(201).json({ success: true, data: newOrder });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in createOrder controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in createOrder controller");
                    res.status(500).json({ success: false, message: "Something went wrong in createOrder" });
                }
            }
        });
    }
    // Update an existing order
    static updateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const orderDetails = req.body;
                const updatedOrder = yield OrderService_1.OrderService.updateOrder(Number(id), orderDetails);
                if (!updatedOrder) {
                    logger_1.default.warn("Order not found for update", { orderId: id });
                    throw new Error("Order not found");
                }
                logger_1.default.info("Order updated successfully", { orderId: id });
                res.status(200).json({ success: true, data: updatedOrder });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in updateOrder controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in updateOrder controller");
                    res.status(500).json({ success: false, message: "Something went wrong in updateOrder" });
                }
            }
        });
    }
    // Update order status
    static updateOrderStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { status } = req.body;
                const updatedOrder = yield OrderService_1.OrderService.updateOrderStatus(Number(id), status);
                if (!updatedOrder) {
                    logger_1.default.warn("Order not found for status update", { orderId: id });
                    throw new Error("Order not found");
                }
                logger_1.default.info("Order status updated successfully", { orderId: id });
                res.status(200).json({ success: true, data: updatedOrder });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in updateOrderStatus controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in updateOrderStatus controller");
                    res.status(500).json({ success: false, message: "Something went wrong in updateOrderStatus" });
                }
            }
        });
    }
    // Track an order
    static trackOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const trackingStatus = yield OrderService_1.OrderService.trackOrder(Number(id));
                if (!trackingStatus) {
                    logger_1.default.warn("Tracking info not found for order", { orderId: id });
                    throw new Error("Tracking info not found");
                }
                logger_1.default.info("Order tracking info retrieved successfully", { orderId: id });
                res.status(200).json({ success: true, data: trackingStatus });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in trackOrder controller", error.message);
                    res.status(500).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in trackOrder controller");
                    res.status(500).json({ success: false, message: "Something went wrong in trackOrder" });
                }
            }
        });
    }
    // Delete an order
    static deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const deleted = yield OrderService_1.OrderService.deleteOrder(Number(id));
                if (!deleted) {
                    logger_1.default.warn("Order not found for deletion", { orderId: id });
                    throw new Error("Order not found");
                }
                logger_1.default.info("Order deleted successfully", { orderId: id });
                res.status(204).send(); // No Content
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in deleteOrder controller", error.message);
                    res.status(500).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in deleteOrder controller");
                    res.status(500).json({ success: false, message: "Something went wrong in deleteOrder" });
                }
            }
        });
    }
}
exports.OrderController = OrderController;
