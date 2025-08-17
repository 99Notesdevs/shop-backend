import { Request, Response } from "express";
import { PaymentService } from "../services/PaymentService";
import logger from "../utils/logger";
import { EmailService } from "../utils/EmailService";

export class PaymentsController {
    static async initiatePayment(req: Request, res: Response) {
        const paymentData = req.body;
        const userId = parseInt(req.authUser!);
        logger.info("Entering initiatePayment controller", { paymentData });
        try {
            const redirectUrl = await PaymentService.initiatePayment(paymentData, userId);
            logger.info("Exiting initiatePayment controller", { redirectUrl });
            res.status(200).json({ success: true, data: redirectUrl });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in initiatePayment controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in initiatePayment controller");
                res.status(500).json({ success: false, message: "Something went wrong in initiatePayment" });
            }
        }
    }
    static async initiatePaymentProduct(req: Request, res: Response) {
        const paymentData = req.body;
        const userId = parseInt(req.authUser!);

        logger.info("Entering initiatePaymentProduct controller", { paymentData });
        try {
            const redirectUrl = await PaymentService.initiatePaymentProduct(paymentData, userId);
            logger.info("Exiting initiatePaymentProduct controller", { redirectUrl });
            res.status(200).json({ success: true, data: redirectUrl });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in initiatePaymentProduct controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in initiatePaymentProduct controller");
                res.status(500).json({ success: false, message: "Something went wrong in initiatePaymentProduct" });
            }
        }
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

    static async getPaymentDetails(req: Request, res: Response) {
        const { id } = req.params;
        logger.info("Entering getPaymentDetails controller", { id });
        try {
            const payment = await PaymentService.getPaymentById(Number(id));
            logger.info("Exiting getPaymentDetails controller", { id });
            res.status(200).json({ success: true, data: payment });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in getPaymentDetails controller", error.message);
                res.status(404).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in getPaymentDetails controller");
                res.status(500).json({ success: false, message: "Something went wrong in getPaymentDetails" });
            }
        }
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

    static async checkPaymentStatus(req: Request, res: Response) {
        console.log("sending post request", req.query);
        const { id, val, uid } = req.query;
        const userId = uid;
        logger.info("Entering checkPaymentStatus controller", { id });
        try {
            if (typeof id !== 'string') {
                throw new Error("Invalid id parameter");
            }
            if(typeof val !== 'string') {
                throw new Error("Invalid val parameter");
            }
            if(typeof userId !== 'string') {
                throw new Error("Invalid userId parameter");
            }
            const status = await PaymentService.statusCheck(id, parseInt(val), parseInt(userId));
            logger.info("Exiting checkPaymentStatus controller", { id });
            if (status === 'SUCCESS') {
                // res.json({ success: true, message: "Payment successful" });
                res.redirect(`${process.env.SUCCESS_URL}`);
            } else {
                
                // res.json({ success: false, message: "Payment failed" });
                res.redirect(`${process.env.FAILURE_URL}`);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in checkPaymentStatus controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in checkPaymentStatus controller");
                res.status(500).json({ success: false, message: "Something went wrong in checkPaymentStatus" });
            }
        }
    }
}