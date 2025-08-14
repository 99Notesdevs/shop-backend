import { error } from "console";
import { prisma } from "../config/prisma";
import { IOrder, OrderStatus } from "../interfaces/orders.interface";
import logger from "../utils/logger";

export class OrderRepository {
    // Fetch all orders
    static async getAllOrders() {
        logger.info("Fetching all orders from repository");
        const orders = await prisma.order.findMany();
        logger.info("Fetched all orders from repository");
        return orders;
    }

    // Fetch an order by ID
    static async getOrderById(id: number) {
        logger.info(`Fetching order with id ${id} from repository`);
        const order = await prisma.order.findMany({
            where: { id ,status: "Completed"},
        });
        if (!order) {
            logger.error(`Order with id ${id} not found`);
            return null;
        }
        logger.info(`Fetched order with id ${id} from repository`);
        return order;
    }

    // Get user orders
    static async getUserOrders(userId: number) {
        logger.info("Entering getUserOrders repository", { userId });

        const orders = await prisma.order.findMany({
            where: { userId ,status: "Completed"},
        });

        logger.info("Exiting getUserOrders repository", { userId });
        return orders;
    }

    // Create a new order
    static async createOrder(data: IOrder & { products: Array<{ orderId: number; productId: number; quantity: number; price: number, product: { price: number } }> }) {
        logger.info("Creating new order in repository");
        
        // First, create the order
        const order = await prisma.order.create({
            data: {
                orderDate: new Date(data.orderDate),
                totalAmount: data.totalAmount,
                status: data.status,
                billingAddress: data.billingAddressId ? { connect: { id: data.billingAddressId } } : undefined,
                shippingAddress: data.shippingAddressId ? { connect: { id: data.shippingAddressId } } : undefined,
                user: {
                    connect: { id: data.userId },
                }
            }
        });
        console.log("order",data.products);
        await prisma.orderItem.createMany({
            data: data.products.map(item => ({
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              price: item.product.price
            }))
          });
          
          
        
        logger.info("Created new order in repository", { orderId: order.id });
        return order;
    }

    // Update an order by ID
    static async updateOrder(id: number, data: any) {
        logger.info(`Updating order with id ${id} in repository`);
        const order = await prisma.order.update({
            where: { id },
            data,
        });
        logger.info(`Updated order with id ${id} in repository`);
        return order;
    }

    // Update order status
    static async updateOrderStatus(id: number, status: OrderStatus) {
        logger.info(`Updating status of order with id ${id} in repository`);
        const order = await prisma.order.update({
            where: { id },
            data: { status },
        });
        logger.info(`Updated status of order with id ${id} in repository`);
        return order;
    }

    // Track an order
    static async trackOrder(id: number) {
        logger.info(`Fetching tracking info for order with id ${id} from repository`);
        const order = await prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            logger.error(`Order with id ${id} not found for tracking`);
            return null;
        }
        const trackingInfo = `Order ${order.id} is currently ${order.status}`;
        logger.info(`Fetched tracking info for order with id ${id} from repository`);
        return trackingInfo;
    }
    static async getorderitems(id: number) {
        logger.info(`Fetching order items for order with id ${id} from repository`);
        const orderItems = await prisma.orderItem.findMany({
            where: { orderId: id },
            include: {
                product: {
                    select: { id: true, stock: true,salePrice: true, shippingCharges: true }
                }
            }
        });
        if (!orderItems) {
            logger.error(`Order items for order with id ${id} not found`);
            return null;
        }
        logger.info(`Fetched order items for order with id ${id} from repository`);
        return orderItems;
    }
    // Delete an order by ID
    static async deleteOrder(id: number) {
        logger.info(`Deleting order with id ${id} from repository`);
        const order = await prisma.order.findUnique({
            where: { id },
        });
        if (!order) {
            logger.error(`Order with id ${id} not found for deletion`);
            return false;
        }
        await prisma.order.delete({
            where: { id },
        });
        logger.info(`Deleted order with id ${id} from repository`);
        return true;
    }
}