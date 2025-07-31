import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";
import logger from "../utils/logger";

export class OrderController {
    // Get all orders
    static async getAllOrders(req: Request, res: Response) {
        try {
            const orders = await OrderService.getAllOrders();
            logger.info("Orders retrieved successfully");
            res.status(200).json({ success: true, data: orders });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in getAllOrders controller", error.message);
                res.status(500).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in getAllOrders controller");
                res.status(500).json({ success: false, message: "Something went wrong in getAllOrders" });
            }
        }
    }

    // Get an order by ID
    static async getOrderById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const order = await OrderService.getOrderById(Number(id));
            if (!order) {
                logger.warn("Order not found", { orderId: id });
                throw new Error("Order not found");
            }
            logger.info("Order retrieved successfully", { orderId: id });
            res.status(200).json({ success: true, data: order });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in getOrderById controller", error.message);
                res.status(500).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in getOrderById controller");
                res.status(500).json({ success: false, message: "Something went wrong in getOrderById" });
            }
        }
    }

    // Get user orders
    static async getUserOrders(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const orders = await OrderService.getUserOrders(Number(userId));
            logger.info("User orders retrieved successfully", { userId });
            res.status(200).json({ success: true, data: orders });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in getUserOrders controller", error.message);
                res.status(500).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in getUserOrders controller");
                res.status(500).json({ success: false, message: "Something went wrong in getUserOrders" });
            }
        }
    }

    // Create a new order
    static async createOrder(req: Request, res: Response) {
        try {
            const orderData = req.body;
            const data = {
                orderDate: new Date(orderData.orderDate),
                totalAmount: parseFloat(orderData.totalAmount),
                status: orderData.status,
                userId: parseInt(req.body.authUser) || parseInt(orderData.userId),
                billingAddress: orderData.billingAddress,
                shippingAddress: orderData.shippingAddress
            }
            const newOrder = await OrderService.createOrder(data);
            logger.info("Order created successfully", { orderId: newOrder.id });
            res.status(201).json({ success: true, data: newOrder });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in createOrder controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in createOrder controller");
                res.status(500).json({ success: false, message: "Something went wrong in createOrder" });
            }
        }
    }

    // Update an existing order
    static async updateOrder(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const orderDetails = req.body;
            const updatedOrder = await OrderService.updateOrder(Number(id), orderDetails);
            if (!updatedOrder) {
                logger.warn("Order not found for update", { orderId: id });
                throw new Error("Order not found");
            }
            logger.info("Order updated successfully", { orderId: id });
            res.status(200).json({ success: true, data: updatedOrder });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in updateOrder controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in updateOrder controller");
                res.status(500).json({ success: false, message: "Something went wrong in updateOrder" });
            }
        }
    }

    // Update order status
    static async updateOrderStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updatedOrder = await OrderService.updateOrderStatus(Number(id), status);
            if (!updatedOrder) {
                logger.warn("Order not found for status update", { orderId: id });
                throw new Error("Order not found");
            }
            logger.info("Order status updated successfully", { orderId: id });
            res.status(200).json({ success: true, data: updatedOrder });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in updateOrderStatus controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in updateOrderStatus controller");
                res.status(500).json({ success: false, message: "Something went wrong in updateOrderStatus" });
            }
        }
    }

    // Track an order
    static async trackOrder(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const trackingStatus = await OrderService.trackOrder(Number(id));
            if (!trackingStatus) {
                logger.warn("Tracking info not found for order", { orderId: id });
                throw new Error("Tracking info not found");
            }
            logger.info("Order tracking info retrieved successfully", { orderId: id });
            res.status(200).json({ success: true, data: trackingStatus });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in trackOrder controller", error.message);
                res.status(500).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in trackOrder controller");
                res.status(500).json({ success: false, message: "Something went wrong in trackOrder" });
            }
        }
    }

    // Delete an order
    static async deleteOrder(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await OrderService.deleteOrder(Number(id));
            if (!deleted) {
                logger.warn("Order not found for deletion", { orderId: id });
                throw new Error("Order not found");
            }
            logger.info("Order deleted successfully", { orderId: id });
            res.status(204).send(); // No Content
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in deleteOrder controller", error.message);
                res.status(500).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in deleteOrder controller");
                res.status(500).json({ success: false, message: "Something went wrong in deleteOrder" });
            }
        }
    }
}