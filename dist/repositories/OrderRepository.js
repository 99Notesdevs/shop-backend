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
exports.OrderRepository = void 0;
const prisma_1 = require("../config/prisma");
const logger_1 = __importDefault(require("../utils/logger"));
class OrderRepository {
    // Fetch all orders
    static getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Fetching all orders from repository");
            const orders = yield prisma_1.prisma.order.findMany({
                include: {
                    billingAddress: true,
                    shippingAddress: true,
                    user: true,
                    orderItems: true,
                },
            });
            logger_1.default.info("Fetched all orders from repository");
            return orders;
        });
    }
    // Fetch an order by ID
    static getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching order with id ${id} from repository`);
            const order = yield prisma_1.prisma.order.findUnique({
                where: { id },
            });
            if (!order) {
                logger_1.default.error(`Order with id ${id} not found`);
                return null;
            }
            logger_1.default.info(`Fetched order with id ${id} from repository`);
            return order;
        });
    }
    // Get user orders
    static getUserOrders(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getUserOrders repository", { userId });
            const orders = yield prisma_1.prisma.order.findMany({
                where: { userId },
                include: {
                    orderItems: {
                        include: {
                            product: {
                                select: {
                                    id: true,
                                    name: true,
                                    price: true,
                                    imageUrl: true
                                }
                            }
                        }
                    },
                    shippingAddress: true,
                    billingAddress: true
                },
                orderBy: {
                    orderDate: 'desc'
                }
            });
            logger_1.default.info("Exiting getUserOrders repository", { userId });
            return orders;
        });
    }
    // Create a new order
    static createOrder(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Creating new order in repository");
            // First, create the order
            const order = yield prisma_1.prisma.order.create({
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
            console.log("order", data.products);
            yield prisma_1.prisma.orderItem.createMany({
                data: data.products.map(item => ({
                    orderId: order.id,
                    productId: item.productId,
                    quantity: item.quantity,
                    price: item.product.price
                }))
            });
            logger_1.default.info("Created new order in repository", { orderId: order.id });
            return order;
        });
    }
    // Update an order by ID
    static updateOrder(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Updating order with id ${id} in repository`);
            const order = yield prisma_1.prisma.order.update({
                where: { id },
                data,
            });
            logger_1.default.info(`Updated order with id ${id} in repository`);
            return order;
        });
    }
    // Update order status
    static updateOrderStatus(id, status) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Updating status of order with id ${id} in repository`);
            const order = yield prisma_1.prisma.order.update({
                where: { id },
                data: { status },
            });
            logger_1.default.info(`Updated status of order with id ${id} in repository`);
            return order;
        });
    }
    // Track an order
    static trackOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching tracking info for order with id ${id} from repository`);
            const order = yield prisma_1.prisma.order.findUnique({
                where: { id },
            });
            if (!order) {
                logger_1.default.error(`Order with id ${id} not found for tracking`);
                return null;
            }
            const trackingInfo = `Order ${order.id} is currently ${order.status}`;
            logger_1.default.info(`Fetched tracking info for order with id ${id} from repository`);
            return trackingInfo;
        });
    }
    static getorderitems(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching order items for order with id ${id} from repository`);
            const orderItems = yield prisma_1.prisma.orderItem.findMany({
                where: { orderId: id },
                include: {
                    product: {
                        select: { id: true, stock: true, price: true, imageUrl: true, salePrice: true, shippingCharges: true }
                    }
                }
            });
            if (!orderItems) {
                logger_1.default.error(`Order items for order with id ${id} not found`);
                return null;
            }
            logger_1.default.info(`Fetched order items for order with id ${id} from repository`);
            return orderItems;
        });
    }
    // Delete an order by ID
    static deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Deleting order with id ${id} from repository`);
            const order = yield prisma_1.prisma.order.findUnique({
                where: { id },
            });
            if (!order) {
                logger_1.default.error(`Order with id ${id} not found for deletion`);
                return false;
            }
            yield prisma_1.prisma.order.delete({
                where: { id },
            });
            logger_1.default.info(`Deleted order with id ${id} from repository`);
            return true;
        });
    }
}
exports.OrderRepository = OrderRepository;
