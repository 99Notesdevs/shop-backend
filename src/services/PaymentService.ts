import { PaymentsRepository } from "../repositories/PaymentsRepository";
import { IPayment, IPayload } from "../interfaces/payments.interface";
import logger from "../utils/logger";
import crypto from "crypto";
import axios from "axios";
import paymentsRouter from "../routes/Payments";
import { OrderRepository } from "../repositories/OrderRepository";

export class PaymentService {
    static async getAllPayments() {
        logger.info("Entering getAllPayments service");
        const payments = await PaymentsRepository.getAllPayments();
        logger.info("Exiting getAllPayments service");
        return payments;
    }

    static async getPaymentById(id: number) {
        logger.info("Entering getPaymentById service", { id });
        const payment = await PaymentsRepository.getPaymentById(id);
        if (!payment) {
            logger.warn(`Payment with id ${id} not found`);
            throw new Error("Payment not found");
        }
        logger.info("Exiting getPaymentById service", { id });
        return payment;
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

    static async statusCheck(phonepe_transaction_id: string, val: number, userId: number) {
        logger.info("Entering statusCheck service", { phonepe_transaction_id });
        const keyIndex = 1
        const string  = `/pg/v1/status/${process.env.MERCHANT_ID}/${phonepe_transaction_id}` + process.env.MERCHANT_KEY
        const sha256 = crypto.createHash('sha256').update(string).digest('hex')
        const checksum = sha256 + '###' + keyIndex

        const option = {
            method: 'GET',
            url:`${process.env.MERCHANT_STATUS_URL}/${process.env.MERCHANT_ID}/${phonepe_transaction_id}`,
            headers: {
                accept : 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checksum,
                'X-MERCHANT-ID': process.env.MERCHANT_ID
            },
        }

        const response = await axios.request(option);
        logger.info("Exiting statusCheck service", { phonepe_transaction_id });
        const updateStatus = await PaymentsRepository.updatePayment({transactionId: phonepe_transaction_id, status: String(response.data.success), validity: val, userId});
        return response.data.success;
    }

    static async initiatePayment(data: IPayload, userId: number) {
        logger.info("Entering initiatePayment service", { data });

        const transactionId = crypto.randomUUID();
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
        const sha256 = crypto.createHash("sha256").update(string).digest("hex");
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
        }
        try {
            const response = await axios.request(options);
            const url = response.data.data.instrumentResponse.redirectInfo.url;
            data.redirectUrl = url;
            const newPayment = await PaymentsRepository.createPayment({...paymentData, redirectUrl: url});
            logger.info("Exiting initiatePayment service", { paymentId: newPayment.id });
            return newPayment.redirectUrl;
        } catch (error: unknown) {
            data.status = "FAILED";
            await PaymentsRepository.createPayment(paymentData);
            if (error instanceof Error) {
                logger.error("Error in initiatePayment service", error.message);
                throw new Error("Payment initiation failed: " + error.message);
            } else {
                logger.error("Unknown error in initiatePayment service");
                throw new Error("An unknown error occurred during payment initiation");
            }
        }
    }
    static async initiatePaymentProduct(data: IPayload, userId: number) {
        logger.info("Entering initiatePaymentProduct service", { data });

        const transactionId = crypto.randomUUID();
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
        const sha256 = crypto.createHash("sha256").update(string).digest("hex");
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
        }
        try {
            const response = await axios.request(options);
            const url = response.data.data.instrumentResponse.redirectInfo.url;
            data.redirectUrl = url;
            const newPayment = await PaymentsRepository.createPaymentProduct({...paymentData, redirectUrl: url});
            logger.info("Exiting initiatePaymentProduct service", { paymentId: newPayment.id });
            return newPayment.redirectUrl;
        } catch (error: unknown) {
            data.status = "FAILED";
            await PaymentsRepository.createPaymentProduct(paymentData);
            if (error instanceof Error) {
                logger.error("Error in initiatePaymentProduct service", error.message);
                throw new Error("Payment initiation failed: " + error.message);
            } else {
                logger.error("Unknown error in initiatePaymentProduct service");
                throw new Error("An unknown error occurred during payment initiation");
            }
        }
    }

    // static async handleCallback(transactionId: string, state: string, responseCode: string) {
    //     logger.info("Entering handleCallback service", { transactionId, state, responseCode });
    //     const payments = await PaymentsRepository.getPaymentByTransactionId(transactionId);
    //     if (!payments || payments.length === 0) {
    //         logger.error("Payment with transaction ID not found", { transactionId });
    //         throw new Error("Payment with transaction ID not found: " + transactionId);
    //     }

    //     const payment = payments[0]; // Assuming the first payment in the array is the one to update
    //     if (state.toUpperCase() === "SUCCESS") {
    //         payment.status = "SUCCESS";
    //     } else if (state.toUpperCase() === "FAILED") {
    //         payment.status = "FAILED";
    //     } else {
    //         payment.status = "UNKNOWN";
    //     }

    //     await PaymentsRepository.updatePayment(payment);
    //     logger.info("Exiting handleCallback service", { transactionId, status: payment.status });
    //     if(payment.status === "SUCCESS") {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // }
}