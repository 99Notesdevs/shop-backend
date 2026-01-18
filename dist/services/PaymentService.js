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
exports.PaymentService = void 0;
const PaymentsRepository_1 = require("../repositories/PaymentsRepository");
const logger_1 = __importDefault(require("../utils/logger"));
const crypto_1 = __importDefault(require("crypto"));
const axios_1 = __importDefault(require("axios"));
const OrderRepository_1 = require("../repositories/OrderRepository");
const CouponService_1 = require("./CouponService");
class PaymentService {
    static getAllPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getAllPayments service");
            const payments = yield PaymentsRepository_1.PaymentsRepository.getAllPayments();
            logger_1.default.info("Exiting getAllPayments service");
            return payments;
        });
    }
    static getPaymentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getPaymentById service", { id });
            const payment = yield PaymentsRepository_1.PaymentsRepository.getPaymentById(id);
            if (!payment) {
                logger_1.default.warn(`Payment with id ${id} not found`);
                throw new Error("Payment not found");
            }
            logger_1.default.info("Exiting getPaymentById service", { id });
            return payment;
        });
    }
    // static async updatePaymentStatus(id: string, status: string) {
    //     logger.info("Entering updatePaymentStatus service", { id, status });
    //     try {
    //         const payments = await PaymentsRepository.getPaymentByTransactionId(id);
    //         if (!payments || payments.length === 0) {
    //             logger.warn("Payment not found", { id });
    //             throw new Error("Payment not found");
    //         }
    //         const payment = payments[0]; // Assuming the first payment in the array is the one to update
    //         payment.status = status;
    //         const updatedPayment = await PaymentsRepository.updatePayment(payment);
    //         logger.info("Exiting updatePaymentStatus service", { id, status });
    //         return updatedPayment;
    //     } catch (error: unknown) {
    //         if (error instanceof Error) {
    //             logger.error("Error in updatePaymentStatus service", error.message);
    //             throw new Error(error.message);
    //         } else {
    //             logger.error("Unknown error in updatePaymentStatus service");
    //             throw new Error("An unknown error occurred while updating payment status");
    //         }
    //     }
    // }
    static statusCheck(phonepe_transaction_id, val, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering statusCheck service", { phonepe_transaction_id });
            const keyIndex = 1;
            const string = `/pg/v1/status/${process.env.MERCHANT_ID}/${phonepe_transaction_id}` + process.env.MERCHANT_KEY;
            const sha256 = crypto_1.default.createHash('sha256').update(string).digest('hex');
            const checksum = sha256 + '###' + keyIndex;
            const option = {
                method: 'GET',
                url: `${process.env.MERCHANT_STATUS_URL}/${process.env.MERCHANT_ID}/${phonepe_transaction_id}`,
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-VERIFY': checksum,
                    'X-MERCHANT-ID': process.env.MERCHANT_ID
                },
            };
            const response = yield axios_1.default.request(option);
            console.log("response of status check", response.data);
            logger_1.default.info("Exiting statusCheck service", { phonepe_transaction_id });
            const updateStatus = yield PaymentsRepository_1.PaymentsRepository.updatePayment({ transactionId: phonepe_transaction_id, status: String(response.data.state), validity: val, userId });
            return response.data.data.state;
        });
    }
    static initiatePayment(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering initiatePayment service", { data });
            const transactionId = crypto_1.default.randomUUID();
            data.phonepe_transaction_id = transactionId;
            data.status = "PENDING";
            const paymentPayload = {
                merchantId: process.env.MERCHANT_ID,
                merchantTransactionId: transactionId,
                merchantUserId: `USER_${data.orderId}`,
                mobileNumber: '9690620146',
                callbackUrl: `${process.env.REDIRECT_URL}?id=${transactionId}&val=${data.validity}&uid=${userId}`,
                callbackMode: "GET",
                redirectUrl: `${process.env.REDIRECT_URL}?id=${transactionId}&val=${data.validity}&uid=${userId}`,
                redirectMode: "GET",
                amount: data.amount * 100,
                paymentInstrument: {
                    type: "PAY_PAGE",
                },
            };
            const payload = Buffer.from(JSON.stringify(paymentPayload)).toString("base64");
            const keyIndex = 1;
            const string = payload + "/pg/v1/pay" + process.env.MERCHANT_KEY;
            const sha256 = crypto_1.default.createHash("sha256").update(string).digest("hex");
            const checksum = sha256 + "###" + keyIndex;
            const options = {
                method: "POST",
                url: process.env.MERCHANT_BASE_URL,
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    "X-VERIFY": checksum,
                },
                data: {
                    request: payload,
                },
            };
            const paymentData = {
                orderId: data.orderId,
                paymentMethod: "PHONEPE",
                amount: data.amount,
                status: "PENDING",
                phonepe_transactionId: transactionId,
                phonepe_signature: checksum,
                paymentDate: new Date(),
            };
            try {
                const response = yield axios_1.default.request(options);
                const url = response.data.data.instrumentResponse.redirectInfo.url;
                data.redirectUrl = url;
                const newPayment = yield PaymentsRepository_1.PaymentsRepository.createPayment(Object.assign(Object.assign({}, paymentData), { redirectUrl: url }));
                logger_1.default.info("Exiting initiatePayment service", { paymentId: newPayment.id });
                return newPayment.redirectUrl;
            }
            catch (error) {
                data.status = "FAILED";
                yield PaymentsRepository_1.PaymentsRepository.createPayment(paymentData);
                if (error instanceof Error) {
                    logger_1.default.error("Error in initiatePayment service", error.message);
                    throw new Error("Payment initiation failed: " + error.message);
                }
                else {
                    logger_1.default.error("Unknown error in initiatePayment service");
                    throw new Error("An unknown error occurred during payment initiation");
                }
            }
        });
    }
    static initiatePaymentProduct(data, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering initiatePaymentProduct service", { data });
            const orderItems = yield OrderRepository_1.OrderRepository.getorderitems(data.orderId);
            if (!orderItems) {
                logger_1.default.error("Order items not found for order with id " + data.orderId);
                throw new Error("Order items not found for order with id " + data.orderId);
            }
            console.log("orderItems", orderItems);
            const amount = orderItems.reduce((total, item) => {
                var _a, _b;
                return total +
                    (((_b = (_a = item.product) === null || _a === void 0 ? void 0 : _a.salePrice) !== null && _b !== void 0 ? _b : item.price) * item.quantity);
            }, 0);
            console.log("amount", amount);
            let shippingCharge = 0;
            if (amount < 500) {
                shippingCharge = orderItems.reduce((max, item) => Math.max(max, item.product.shippingCharges), 0);
            }
            console.log("shippingCharge", shippingCharge);
            const transactionId = crypto_1.default.randomUUID();
            data.phonepe_transaction_id = transactionId;
            data.status = "PENDING";
            let finalAmount = amount + shippingCharge;
            console.log("finalAmount", finalAmount);
            if (data.couponcode) {
                const coupon = yield CouponService_1.CouponService.useCoupon(data.couponcode, userId, data.orderId);
                if (coupon) {
                    if (coupon.type == "percentage") {
                        finalAmount = finalAmount - (finalAmount * coupon.discount / 100);
                    }
                    else {
                        finalAmount = finalAmount - coupon.discount;
                    }
                }
            }
            console.log("finalAmount", finalAmount);
            const paymentPayload = {
                merchantId: process.env.MERCHANT_ID,
                merchantTransactionId: transactionId,
                merchantUserId: `USER_${data.orderId}`,
                mobileNumber: '9690620146',
                callbackUrl: `${process.env.REDIRECT_URL}?id=${transactionId}&val=${data.validity}&uid=${userId}&orderId=${data.orderId}`,
                callbackMode: "GET",
                redirectUrl: `${process.env.REDIRECT_URL}?id=${transactionId}&val=${data.validity}&uid=${userId}&orderId=${data.orderId}`,
                redirectMode: "GET",
                amount: finalAmount * 100,
                paymentInstrument: {
                    type: "PAY_PAGE",
                },
            };
            const payload = Buffer.from(JSON.stringify(paymentPayload)).toString("base64");
            const keyIndex = 1;
            const string = payload + "/pg/v1/pay" + process.env.MERCHANT_KEY;
            const sha256 = crypto_1.default.createHash("sha256").update(string).digest("hex");
            const checksum = sha256 + "###" + keyIndex;
            const options = {
                method: "POST",
                url: process.env.MERCHANT_BASE_URL,
                headers: {
                    accept: "application/json",
                    "Content-Type": "application/json",
                    "X-VERIFY": checksum,
                },
                data: {
                    request: payload,
                },
            };
            const paymentData = {
                orderId: data.orderId,
                productId: data.productId,
                paymentMethod: "PHONEPE",
                amount: finalAmount * 100,
                status: "PENDING",
                quantity: data.quantity,
                phonepe_transactionId: transactionId,
                phonepe_signature: checksum,
                paymentDate: new Date(),
            };
            try {
                const response = yield axios_1.default.request(options);
                const url = response.data.data.instrumentResponse.redirectInfo.url;
                data.redirectUrl = url;
                console.log("We are here");
                console.log(data.redirectUrl, "data.redirectUrl");
                const newPayment = yield PaymentsRepository_1.PaymentsRepository.createPaymentProduct(Object.assign(Object.assign({}, paymentData), { redirectUrl: url }));
                logger_1.default.info("Exiting initiatePaymentProduct service", { paymentId: newPayment.id });
                return newPayment.redirectUrl;
            }
            catch (error) {
                data.status = "FAILED";
                yield PaymentsRepository_1.PaymentsRepository.createPaymentProduct(paymentData);
                if (error instanceof Error) {
                    logger_1.default.error("Error in initiatePaymentProduct service", error.message);
                    throw new Error("Payment initiation failed: " + error.message);
                }
                else {
                    logger_1.default.error("Unknown error in initiatePaymentProduct service");
                    throw new Error("An unknown error occurred during payment initiation");
                }
            }
        });
    }
}
exports.PaymentService = PaymentService;
