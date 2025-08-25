import { CouponRepository } from "../repositories/CouponRepository";
import logger from "../utils/logger";
import { IOrder } from "../interfaces/orders.interface";
import { UserCouponRepository } from "../repositories/UserCouponRepository";
import { OrderRepository } from "../repositories/OrderRepository";
export class CouponService {
    static async createCoupon(coupon: any) {
        logger.info("Entering createCoupon service", { coupon });
        try {
            const newCoupon = await CouponRepository.createCoupon(coupon);
            logger.info("Exiting createCoupon service", { newCoupon });
            return newCoupon;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in createCoupon service", error.message);
                throw error;
            } else {
                logger.error("Unknown error in createCoupon service");
                throw new Error("Something went wrong in createCoupon");
            }
        }
    }
    static async getCouponByType(code: string) {
        logger.info("Entering getCouponByType service", { code });
        try {
            const coupon = await CouponRepository.findCouponByType(code);
            logger.info("Exiting getCouponByType service", { coupon });
            return coupon;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in getCouponByType service", error.message);
                throw error;
            } else {
                logger.error("Unknown error in getCouponByType service");
                throw new Error("Something went wrong in getCouponByType");
            }
        }
    }
    static async getAllCoupons() {
        logger.info("Entering getAllCoupons service");
        try {
            const coupons = await CouponRepository.findAllCoupons();
            logger.info("Exiting getAllCoupons service", { coupons });
            return coupons;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in getAllCoupons service", error.message);
                throw error;
            } else {
                logger.error("Unknown error in getAllCoupons service");
                throw new Error("Something went wrong in getAllCoupons");
            }
        }
    }
    static async useCoupon(code:string,userId:number,totalAmount:number){
        logger.info("Entering useCoupon service", { code });
        try {
            const coupon = await CouponRepository.findCouponByType(code);
            // const order=await OrderRepository.getOrderById(orderId);
            // if(!order){
            //     throw new Error("Order not found");
            // }
            if(!coupon){
                throw new Error("Coupon not found");
            }   
            if(coupon.endDate && coupon.endDate < new Date()){
                throw new Error("Coupon expired");
            }
            if(coupon.minOrderValue && coupon.minOrderValue > totalAmount){
                throw new Error("Order amount is less than minimum order value");
            }
            
            const updatedCoupon=await CouponRepository.updateCoupon(coupon.id,{timesUsed:(coupon.timesUsed||0)+1});

            const userCoupon=await UserCouponRepository.createUserCoupon(userId,coupon.id,coupon.usageLimitPerUser ?? null);
            logger.info("Exiting useCoupon service", { coupon });
            return coupon;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in useCoupon service", error.message);
                throw error;
            } else {
                logger.error("Unknown error in useCoupon service");
                throw new Error("Something went wrong in useCoupon");
            }
        }
    }
    static async removeCoupon(code:string,userId:number,order:IOrder){
        logger.info("Entering removeCoupon service", { code });
        try {
            const coupon = await CouponRepository.findCouponByType(code);
            if(!coupon){
                throw new Error("Coupon not found");
            }
            if(coupon.timesUsed>0){
                const updatedCoupon=await CouponRepository.updateCoupon(coupon.id,{timesUsed:(coupon.timesUsed||0)-1});
            }
            const userCoupon=await UserCouponRepository.removeUserCoupon(userId,coupon.id);
            logger.info("Exiting removeCoupon service", { coupon });
            return coupon;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in removeCoupon service", error.message);
                throw error;
            } else {
                logger.error("Unknown error in removeCoupon service");
                throw new Error("Something went wrong in removeCoupon");
            }
        }
    }
    static async getCouponById(id: number) {
        logger.info("Entering getCouponById service", { id });
        try {
            const coupon = await CouponRepository.findCouponById(id);
            logger.info("Exiting getCouponById service", { coupon });
            return coupon;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in getCouponById service", error.message);
                throw error;
            } else {
                logger.error("Unknown error in getCouponById service");
                throw new Error("Something went wrong in getCouponById");
            }
        }
    }
    static async updateCoupon(id: number, coupon: any) {
        logger.info("Entering updateCoupon service", { id, coupon });
        try {
            const updatedCoupon = await CouponRepository.updateCoupon(id, coupon);
            logger.info("Exiting updateCoupon service", { updatedCoupon });
            return updatedCoupon;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in updateCoupon service", error.message);
                throw error;
            } else {
                logger.error("Unknown error in updateCoupon service");
                throw new Error("Something went wrong in updateCoupon");
            }
        }
    }
    static async deleteCoupon(id: number) {
        logger.info("Entering deleteCoupon service", { id });
        try {
            const deletedCoupon = await CouponRepository.deleteCoupon(id);
            logger.info("Exiting deleteCoupon service", { deletedCoupon });
            return deletedCoupon;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in deleteCoupon service", error.message);
                throw error;
            } else {
                logger.error("Unknown error in deleteCoupon service");
                throw new Error("Something went wrong in deleteCoupon");
            }
        }
    }
}
