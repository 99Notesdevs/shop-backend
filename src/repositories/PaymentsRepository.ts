import { prisma } from '../config/prisma';
import logger from '../utils/logger';
import { IPayment } from '../interfaces/payments.interface';

export class PaymentsRepository {
    static async getAllPayments() {
        logger.info("Entering getAllPayments repository method");
        const payments = await prisma.payment.findMany({
            orderBy: { createdAt: 'desc' }
        });
        logger.info("Exiting getAllPayments repository method");
        return payments;
    }

    static async getPaymentById(id: number) {
        logger.info("Entering getPaymentById repository method", { id });
        const payment = await prisma.payment.findUnique({
            where: { id },
        });
        logger.info("Exiting getPaymentById repository method", { id });
        return payment;
    }

    static async getPaymentByTransactionId(transactionId: string) {
        logger.info("Entering getPaymentByTransactionId repository method", { transactionId });
        const payment = await prisma.payment.findMany({
            where: { phonepe_transactionId: transactionId },
        });
        logger.info("Exiting getPaymentByTransactionId repository method", { transactionId });
        return payment;
    }

    static async createPayment(data: any) {
        logger.info("Entering createPayment repository method", { data });
        const payment = await prisma.$transaction(async (tx: any) => {

            const payment = await tx.payment.create({
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
            if(!data.validity) {
                return payment;
            }
            const updateUser = await tx.userData.update({
                where: { id: data.userId },
                data: {
                    paidUser: true,
                    validTill: new Date(Date.now() + data.validity * 24 * 60 * 60 * 1000),
                }
            });
            return payment;
        });
        logger.info("Exiting createPayment repository method");
        return payment;
    }

    static async createPaymentProduct(data: any) {
        logger.info("Entering createPaymentProduct repository method", { data });
        try {
            const payment = await prisma.$transaction(async (tx: any) => {
                // First, get all order items for this order
                const orderItems = await tx.orderItem.findMany({
                    where: { orderId: data.orderId },
                    include: {
                        product: {
                            select: { id: true, stock: true,salePrice: true, shippingCharges: true }
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

                    const updatedProduct = await prisma.product.findUnique({
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
                console.log(orderItems,"orderItems");
                
                // Create the payment record
                console.log(data.redirectUrl,"data.redirectUrl in repositroy");
                const payment = await tx.payment.create({
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
            });
            
            logger.info("Exiting createPaymentProduct repository method");
            return payment;
        } catch (error) {
            logger.error(`Error in createPaymentProduct ${error}`, { error });
            throw error;
        }
    }

    static async updatePayment({ transactionId, validity, status, userId }: { transactionId: string, validity: number, status: string, userId: number }) {
        logger.info("Entering updatePayment repository method");
        const updatePayment = await prisma.$transaction(async (tx: any) => {
            const payment = await tx.payment.updateMany({
                where: { phonepe_transactionId: transactionId },
                data: {
                    status: status,
                }
            });
            const updateUser = await tx.userData.update({
                where: { id: userId },
                data: {
                    paidUser: true,
                    validTill: new Date(Date.now() + validity * 24 * 60 * 60 * 1000),
                }
            });
            return payment;
        });
        logger.info("Exiting updatePayment repository method");
        return updatePayment;
    }
}