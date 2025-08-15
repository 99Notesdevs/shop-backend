import { Request, Response } from "express";
import { CouponService } from "../services/CouponService";
import { IOrder, OrderStatus } from "../interfaces/orders.interface";
import logger from "../utils/logger";

export class CouponController {
    static async createCoupon(req: Request, res: Response) {
        logger.info("Entering createCoupon controller", { req });
        try {
            const coupon = await CouponService.createCoupon(req.body);
            logger.info("Exiting createCoupon controller", { coupon });
            res.status(201).json({ success: true, data: coupon });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in createCoupon controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in createCoupon controller");
                res.status(500).json({ success: false, message: "Something went wrong in createCoupon" });
            }
        }
    }
    static async getAllCoupons(req: Request, res: Response) {
        logger.info("Entering getAllCoupons controller");
        try {
            const coupons = await CouponService.getAllCoupons();
            logger.info("Exiting getAllCoupons controller", { coupons });
            res.status(200).json({ success: true, data: coupons });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in getAllCoupons controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in getAllCoupons controller");
                res.status(500).json({ success: false, message: "Something went wrong in getAllCoupons" });
            }
        }
    }
    static async getCouponByType(req: Request, res: Response) {
        logger.info("Entering getCouponByType controller", { req });
        try {
            const coupon = await CouponService.getCouponByType(req.params.code);
            logger.info("Exiting getCouponByType controller", { coupon });
            res.status(200).json({ success: true, data: coupon });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in getCouponByType controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in getCouponByType controller");
                res.status(500).json({ success: false, message: "Something went wrong in getCouponByType" });
            }
        }
    }
    static async useCoupon(req: Request, res: Response) {
        logger.info("Entering useCoupon controller", { req });
        const code=req.params.code;
        const userId=req.body.authUser;
        const order=req.body.order;
        try {
            const coupon = await CouponService.useCoupon(code,userId,order);
            logger.info("Exiting useCoupon controller", { coupon });
            res.status(200).json({ success: true, data: coupon });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in useCoupon controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in useCoupon controller");
                res.status(500).json({ success: false, message: "Something went wrong in useCoupon" });
            }
        }
    }
    static async removeCoupon(req: Request, res: Response) {
        logger.info("Entering removeCoupon controller", { req });
        try {
            const code=req.params.code;
            const userId=req.body.authUser;
            const order=req.body.order;
            const coupon = await CouponService.removeCoupon(code,userId,order);
            logger.info("Exiting removeCoupon controller", { coupon });
            res.status(200).json({ success: true, data: coupon });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in removeCoupon controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in removeCoupon controller");
                res.status(500).json({ success: false, message: "Something went wrong in removeCoupon" });
            }
        }
    }
    static async getCouponById(req: Request, res: Response) {
        logger.info("Entering getCouponById controller", { req });
        try {
            const coupon = await CouponService.getCouponById(parseInt(req.params.id));
            logger.info("Exiting getCouponById controller", { coupon });
            res.status(200).json({ success: true, data: coupon });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in getCouponById controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in getCouponById controller");
                res.status(500).json({ success: false, message: "Something went wrong in getCouponById" });
            }
        }
    }
    static async updateCoupon(req: Request, res: Response) {
        logger.info("Entering updateCoupon controller", { req });
        try {
            const coupon = await CouponService.updateCoupon(parseInt(req.params.id), req.body);
            logger.info("Exiting updateCoupon controller", { coupon });
            res.status(200).json({ success: true, data: coupon });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in updateCoupon controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in updateCoupon controller");
                res.status(500).json({ success: false, message: "Something went wrong in updateCoupon" });
            }
        }
    }
    static async deleteCoupon(req: Request, res: Response) {
        logger.info("Entering deleteCoupon controller", { req });
        try {
            const coupon = await CouponService.deleteCoupon(parseInt(req.params.id));
            logger.info("Exiting deleteCoupon controller", { coupon });
            res.status(200).json({ success: true, data: coupon });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in deleteCoupon controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in deleteCoupon controller");
                res.status(500).json({ success: false, message: "Something went wrong in deleteCoupon" });
            }
        }
    }
}