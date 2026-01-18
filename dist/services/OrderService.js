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
exports.OrderService = void 0;
const OrderRepository_1 = require("../repositories/OrderRepository");
const logger_1 = __importDefault(require("../utils/logger"));
class OrderService {
    // Create a new order
    static createOrder(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering createOrder service");
            const newOrder = yield OrderRepository_1.OrderRepository.createOrder(orderData);
            logger_1.default.info("Exiting createOrder service", { orderId: newOrder.id });
            return newOrder;
        });
    }
    // Get all orders
    static getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getAllOrders service");
            const orders = yield OrderRepository_1.OrderRepository.getAllOrders();
            logger_1.default.info("Exiting getAllOrders service");
            return orders;
        });
    }
    // Get an order by ID
    static getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getOrderById service", { orderId: id });
            const order = yield OrderRepository_1.OrderRepository.getOrderById(id);
            if (!order) {
                logger_1.default.warn("Order not found in service", { orderId: id });
                return null;
            }
            logger_1.default.info("Exiting getOrderById service", { orderId: id });
            return order;
        });
    }
    // Get user orders
    static getUserOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getUserOrders service", { userId });
            const orders = yield OrderRepository_1.OrderRepository.getUserOrders(userId);
            if (!orders) {
                logger_1.default.warn("User orders not found in service", { userId });
                return null;
            }
            logger_1.default.info("Exiting getUserOrders service", { userId });
            return orders;
        });
    }
    // Update an existing order
    static updateOrder(id, orderDetails) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateOrder service", { orderId: id, orderDetails });
            const updatedOrder = yield OrderRepository_1.OrderRepository.updateOrder(id, orderDetails);
            if (!updatedOrder) {
                logger_1.default.warn("Order not found for update in service", { orderId: id });
                return null;
            }
            logger_1.default.info("Exiting updateOrder service", { orderId: id });
            return updatedOrder;
        });
    }
    // Update order status
    static updateOrderStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateOrderStatus service", { orderId: id, status });
            const updatedOrder = yield OrderRepository_1.OrderRepository.updateOrderStatus(id, status);
            if (!updatedOrder) {
                logger_1.default.warn("Order not found for status update in service", { orderId: id });
                return null;
            }
            logger_1.default.info("Exiting updateOrderStatus service", { orderId: id });
            return updatedOrder;
        });
    }
    // Track an order
    static trackOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering trackOrder service", { orderId: id });
            const trackingStatus = yield OrderRepository_1.OrderRepository.trackOrder(id);
            if (!trackingStatus) {
                logger_1.default.warn("Tracking info not found for order in service", { orderId: id });
                return null;
            }
            logger_1.default.info("Exiting trackOrder service", { orderId: id });
            return trackingStatus;
        });
    }
    // Delete an order
    static deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering deleteOrder service", { orderId: id });
            const deleted = yield OrderRepository_1.OrderRepository.deleteOrder(id);
            if (!deleted) {
                logger_1.default.warn("Order not found for deletion in service", { orderId: id });
                return false;
            }
            logger_1.default.info("Exiting deleteOrder service", { orderId: id });
            return true;
        });
    }
}
exports.OrderService = OrderService;
