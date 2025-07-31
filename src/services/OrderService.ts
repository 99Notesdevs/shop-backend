import { OrderStatus } from "../interfaces/orders.interface";
import { OrderRepository } from "../repositories/OrderRepository";
import logger from "../utils/logger";

export class OrderService {
    // Create a new order
    static async createOrder(orderData: any) {
        logger.info("Entering createOrder service");

        const newOrder = await OrderRepository.createOrder(orderData);

        logger.info("Exiting createOrder service", { orderId: newOrder.id });
        return newOrder;
    }

    // Get all orders
    static async getAllOrders() {
        logger.info("Entering getAllOrders service");

        const orders = await OrderRepository.getAllOrders();

        logger.info("Exiting getAllOrders service");
        return orders;
    }

    // Get an order by ID
    static async getOrderById(id: number) {
        logger.info("Entering getOrderById service", { orderId: id });

        const order = await OrderRepository.getOrderById(id);
        if (!order) {
            logger.warn("Order not found in service", { orderId: id });
            return null;
        }

        logger.info("Exiting getOrderById service", { orderId: id });
        return order;
    }

    // Get user orders
    static async getUserOrders(userId: number) {
        logger.info("Entering getUserOrders service", { userId });

        const orders = await OrderRepository.getUserOrders(userId);
        if (!orders) {
            logger.warn("User orders not found in service", { userId });
            return null;
        }

        logger.info("Exiting getUserOrders service", { userId });
        return orders;
    }

    // Update an existing order
    static async updateOrder(id: number, orderDetails: any) {
        logger.info("Entering updateOrder service", { orderId: id, orderDetails });

        const updatedOrder = await OrderRepository.updateOrder(id, orderDetails);
        if (!updatedOrder) {
            logger.warn("Order not found for update in service", { orderId: id });
            return null;
        }

        logger.info("Exiting updateOrder service", { orderId: id });
        return updatedOrder;
    }

    // Update order status
    static async updateOrderStatus(id: number, status: OrderStatus) {
        logger.info("Entering updateOrderStatus service", { orderId: id, status });

        const updatedOrder = await OrderRepository.updateOrderStatus(id, status);
        if (!updatedOrder) {
            logger.warn("Order not found for status update in service", { orderId: id });
            return null;
        }

        logger.info("Exiting updateOrderStatus service", { orderId: id });
        return updatedOrder;
    }

    // Track an order
    static async trackOrder(id: number) {
        logger.info("Entering trackOrder service", { orderId: id });

        const trackingStatus = await OrderRepository.trackOrder(id);
        if (!trackingStatus) {
            logger.warn("Tracking info not found for order in service", { orderId: id });
            return null;
        }

        logger.info("Exiting trackOrder service", { orderId: id });
        return trackingStatus;
    }

    // Delete an order
    static async deleteOrder(id: number) {
        logger.info("Entering deleteOrder service", { orderId: id });

        const deleted = await OrderRepository.deleteOrder(id);
        if (!deleted) {
            logger.warn("Order not found for deletion in service", { orderId: id });
            return false;
        }

        logger.info("Exiting deleteOrder service", { orderId: id });
        return true;
    }
}