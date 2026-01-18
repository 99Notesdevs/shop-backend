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
exports.PaymentsRepository = void 0;
const prisma_1 = require("../config/prisma");
const logger_1 = __importDefault(require("../utils/logger"));
class PaymentsRepository {
    static getAllPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getAllPayments repository method");
            const payments = yield prisma_1.prisma.payment.findMany({
                orderBy: { createdAt: 'desc' }
            });
            logger_1.default.info("Exiting getAllPayments repository method");
            return payments;
        });
    }
    static getPaymentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getPaymentById repository method", { id });
            const payment = yield prisma_1.prisma.payment.findUnique({
                where: { id },
            });
            logger_1.default.info("Exiting getPaymentById repository method", { id });
            return payment;
        });
    }
    static getPaymentByTransactionId(transactionId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getPaymentByTransactionId repository method", { transactionId });
            const payment = yield prisma_1.prisma.payment.findMany({
                where: { phonepe_transactionId: transactionId },
            });
            logger_1.default.info("Exiting getPaymentByTransactionId repository method", { transactionId });
            return payment;
        });
    }
    static createPayment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering createPayment repository method", { data });
            const payment = yield prisma_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const payment = yield tx.payment.create({
                    data: {
                        orderId: data.orderId,
                        paymentMethod: data.paymentMethod,
                        amount: data.amount,
                        status: data.status,
                        phonepe_transactionId: data.phonepe_transactionId,
                        phonepe_signature: data.phonepe_signature,
                        paymentDate: data.paymentDate,
                        redirectUrl: data.redirectUrl
                    }
                });
                if (!data.validity) {
                    return payment;
                }
                const updateUser = yield tx.userData.update({
                    where: { id: data.userId },
                    data: {
                        paidUser: true,
                        validTill: new Date(Date.now() + data.validity * 24 * 60 * 60 * 1000),
                    }
                });
                return payment;
            }));
            logger_1.default.info("Exiting createPayment repository method");
            return payment;
        });
    }
    static createPaymentProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering createPaymentProduct repository method", { data });
            try {
                const payment = yield prisma_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                    // First, get all order items for this order
                    const orderItems = yield tx.orderItem.findMany({
                        where: { orderId: data.orderId },
                        include: {
                            product: {
                                select: { id: true, stock: true, salePrice: true, shippingCharges: true }
                            }
                        }
                    });
                    if (!orderItems || orderItems.length === 0) {
                        throw new Error("No items found in the order");
                    }
                    // Check stock and update each product
                    for (const item of orderItems) {
                        if (!item.product || item.product.stock < item.quantity) {
                            throw new Error(`Insufficient stock for product ID: ${item.productId}`);
                        }
                        const updatedProduct = yield prisma_1.prisma.product.findUnique({
                            where: {
                                id: item.productId
                            }
                        });
                        if (!updatedProduct) {
                            throw new Error(`No product found with ID: ${item.productId}`);
                        }
                        const updatedStock = updatedProduct.stock - item.quantity;
                        if (updatedStock < 0) {
                            throw new Error(`Insufficient stock for product ID: ${item.productId}`);
                        }
                    }
                    console.log(orderItems, "orderItems");
                    // Create the payment record
                    console.log(data.redirectUrl, "data.redirectUrl in repositroy");
                    const payment = yield tx.payment.create({
                        data: {
                            orderId: data.orderId,
                            paymentMethod: data.paymentMethod,
                            amount: data.amount,
                            status: data.status,
                            phonepe_transactionId: data.phonepe_transactionId,
                            phonepe_signature: data.phonepe_signature,
                            paymentDate: data.paymentDate,
                            redirectUrl: data.redirectUrl
                        }
                    });
                    // Update order status
                    // await tx.order.update({
                    //     where: { id: data.orderId },
                    //     data: { status: "Completed" }
                    // });
                    return payment;
                }));
                logger_1.default.info("Exiting createPaymentProduct repository method");
                return payment;
            }
            catch (error) {
                logger_1.default.error(`Error in createPaymentProduct ${error}`, { error });
                throw error;
            }
        });
    }
    static updatePayment(_a) {
        return __awaiter(this, arguments, void 0, function* ({ transactionId, validity, status, userId }) {
            logger_1.default.info("Entering updatePayment repository method");
            const updatePayment = yield prisma_1.prisma.$transaction((tx) => __awaiter(this, void 0, void 0, function* () {
                const payment = yield tx.payment.updateMany({
                    where: { phonepe_transactionId: transactionId },
                    data: {
                        status: status,
                    }
                });
                const updateUser = yield tx.userData.update({
                    where: { id: userId },
                    data: {
                        paidUser: true,
                        validTill: new Date(Date.now() + validity * 24 * 60 * 60 * 1000),
                    }
                });
                return payment;
            }));
            logger_1.default.info("Exiting updatePayment repository method");
            return updatePayment;
        });
    }
}
exports.PaymentsRepository = PaymentsRepository;
