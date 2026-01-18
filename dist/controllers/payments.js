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
exports.PaymentsController = void 0;
const PaymentService_1 = require("../services/PaymentService");
const logger_1 = __importDefault(require("../utils/logger"));
const OrderRepository_1 = require("../repositories/OrderRepository");
const orders_interface_1 = require("../interfaces/orders.interface");
const ProductRepository_1 = require("../repositories/ProductRepository");
class PaymentsController {
    static initiatePayment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentData = req.body;
            const userId = parseInt(req.authUser);
            logger_1.default.info("Entering initiatePayment controller", { paymentData });
            try {
                const redirectUrl = yield PaymentService_1.PaymentService.initiatePayment(paymentData, userId);
                logger_1.default.info("Exiting initiatePayment controller", { redirectUrl });
                res.status(200).json({ success: true, data: redirectUrl });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in initiatePayment controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in initiatePayment controller");
                    res.status(500).json({ success: false, message: "Something went wrong in initiatePayment" });
                }
            }
        });
    }
    static initiatePaymentProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentData = req.body;
            const userId = parseInt(req.authUser);
            logger_1.default.info("Entering initiatePaymentProduct controller", { paymentData });
            try {
                const redirectUrl = yield PaymentService_1.PaymentService.initiatePaymentProduct(paymentData, userId);
                logger_1.default.info("Exiting initiatePaymentProduct controller", { redirectUrl });
                res.status(200).json({ success: true, data: redirectUrl });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in initiatePaymentProduct controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in initiatePaymentProduct controller");
                    res.status(500).json({ success: false, message: "Something went wrong in initiatePaymentProduct" });
                }
            }
        });
    }
    // static async handlePaymentCallback(req: Request, res: Response) {
    //     const { transactionId, state, responseCode } = req.query;
    //     logger.info("Entering handlePaymentCallback controller", { transactionId, state, responseCode });
    //     try {
    //         const status = await PaymentService.handleCallback(transactionId as string, state as string, responseCode as string);
    //         if (status) {
    //             res.redirect(`${process.env.SUCCESS_URL}`);
    //         } else {
    //             res.redirect(`${process.env.FAILURE_URL}`);
    //         }
    //     } catch (error: unknown) {
    //         if (error instanceof Error) {
    //             logger.error("Error in handlePaymentCallback controller", error.message);
    //             res.status(400).json({ success: false, message: error.message });
    //         } else {
    //             logger.error("Unknown error in handlePaymentCallback controller");
    //             res.status(500).json({ success: false, message: "Something went wrong in handlePaymentCallback" });
    //         }
    //     }
    // }
    static getPaymentDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            logger_1.default.info("Entering getPaymentDetails controller", { id });
            try {
                const payment = yield PaymentService_1.PaymentService.getPaymentById(Number(id));
                logger_1.default.info("Exiting getPaymentDetails controller", { id });
                res.status(200).json({ success: true, data: payment });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in getPaymentDetails controller", error.message);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in getPaymentDetails controller");
                    res.status(500).json({ success: false, message: "Something went wrong in getPaymentDetails" });
                }
            }
        });
    }
    // static async updatePaymentStatus(req: Request, res: Response) {
    //     const { id } = req.params;
    //     const { status } = req.body;
    //     logger.info("Entering updatePaymentStatus controller", { id, status });
    //     try {
    //         const updatedPayment = await PaymentService.updatePaymentStatus(id, status);
    //         logger.info("Exiting updatePaymentStatus controller", { id });
    //         res.status(200).json({ success: true, data: updatedPayment });
    //     } catch (error: unknown) {
    //         if (error instanceof Error) {
    //             logger.error("Error in updatePaymentStatus controller", error.message);
    //             res.status(400).json({ success: false, message: error.message });
    //         } else {
    //             logger.error("Unknown error in updatePaymentStatus controller");
    //             res.status(500).json({ success: false, message: "Something went wrong in updatePaymentStatus" });
    //         }
    //     }
    // }
    static checkPaymentStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("sending post request", req.query);
            const { id, val, uid, orderId } = req.query;
            const userId = uid;
            logger_1.default.info("Entering checkPaymentStatus controller", { id });
            try {
                if (typeof id !== 'string') {
                    throw new Error("Invalid id parameter");
                }
                if (typeof val !== 'string') {
                    throw new Error("Invalid val parameter");
                }
                if (typeof userId !== 'string') {
                    throw new Error("Invalid userId parameter");
                }
                if (typeof orderId !== 'string') {
                    throw new Error("Invalid orderId parameter");
                }
                const status = yield PaymentService_1.PaymentService.statusCheck(id, parseInt(val), parseInt(userId));
                console.log("status of payment", status);
                logger_1.default.info("Exiting checkPaymentStatus controller", { id });
                if (status === 'COMPLETED') {
                    // res.json({ success: true, message: "Payment successful" });
                    const order = yield OrderRepository_1.OrderRepository.updateOrderStatus(parseInt(orderId), orders_interface_1.OrderStatus.Completed);
                    const currentOrderItems = yield OrderRepository_1.OrderRepository.getorderitems(parseInt(orderId));
                    if (!currentOrderItems) {
                        throw new Error("No items found in the order");
                    }
                    for (const item of currentOrderItems) {
                        const updatedProduct = yield ProductRepository_1.ProductRepository.updateProductStock(item.productId, item.quantity);
                        if (!updatedProduct) {
                            throw new Error(`Failed to update stock for product ID: ${item.productId}`);
                        }
                    }
                    res.redirect(`${process.env.SUCCESS_URL}`);
                }
                else if (status === 'PENDING') {
                    const order = yield OrderRepository_1.OrderRepository.updateOrderStatus(parseInt(orderId), orders_interface_1.OrderStatus.Pending);
                    // res.json({ success: false, message: "Payment failed" });
                    res.redirect(`${process.env.FAILURE_URL}`);
                }
                else {
                    const order = yield OrderRepository_1.OrderRepository.updateOrderStatus(parseInt(orderId), orders_interface_1.OrderStatus.Failed);
                    res.redirect(`${process.env.FAILURE_URL}`);
                }
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in checkPaymentStatus controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in checkPaymentStatus controller");
                    res.status(500).json({ success: false, message: "Something went wrong in checkPaymentStatus" });
                }
            }
        });
    }
}
exports.PaymentsController = PaymentsController;
