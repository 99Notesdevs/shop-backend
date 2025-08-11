import logger from "../utils/logger";
import { prisma } from "../config/prisma";
export class CouponRepository {
    static async createCoupon(coupon: any) {
        logger.info("Entering createCoupon repository", { coupon });
        try {
            const newCoupon = await prisma.coupon.create({ data: coupon });
            logger.info("Exiting createCoupon repository", { newCoupon });
            return newCoupon;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in createCoupon repository", error.message);
                throw error;
            } else {
                logger.error("Unknown error in createCoupon repository");
                throw new Error("Something went wrong in createCoupon");
            }
        }
    }
    static async findCouponByType(code: string) {
        logger.info("Entering findCouponByType repository", { code });
        try {
            const coupon = await prisma.coupon.findUnique({ where: { code } });
            logger.info("Exiting findCouponByType repository", { coupon });
            return coupon;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in findCouponByType repository", error.message);
                throw error;
            } else {
                logger.error("Unknown error in findCouponByType repository");
                throw new Error("Something went wrong in findCouponByType");
            }
        }
    }
    static async findAllCoupons() {
        logger.info("Entering findAllCoupons repository");
        try {
            const coupons = await prisma.coupon.findMany({
                orderBy: { createdAt: "desc" },
            });
            logger.info("Exiting findAllCoupons repository", { coupons });
            return coupons;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in findAllCoupons repository", error.message);
                throw error;
            } else {
                logger.error("Unknown error in findAllCoupons repository");
                throw new Error("Something went wrong in findAllCoupons");
            }
        }
    }
    static async findCouponById(id: number) {
        logger.info("Entering findCouponById repository", { id });
        try {
            const coupon = await prisma.coupon.findUnique({ where: { id } });
            logger.info("Exiting findCouponById repository", { coupon });
            return coupon;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in findCouponById repository", error.message);
                throw error;
            } else {
                logger.error("Unknown error in findCouponById repository");
                throw new Error("Something went wrong in findCouponById");
            }
        }
    }
    static async updateCoupon(id: number, coupon: any) {
        logger.info("Entering updateCoupon repository", { id, coupon });
        try {
            const updatedCoupon = await prisma.coupon.update({ where: { id }, data: coupon });
            logger.info("Exiting updateCoupon repository", { updatedCoupon });
            return updatedCoupon;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in updateCoupon repository", error.message);
                throw error;
            } else {
                logger.error("Unknown error in updateCoupon repository");
                throw new Error("Something went wrong in updateCoupon");
            }
        }
    }
    static async deleteCoupon(id: number) {
        logger.info("Entering deleteCoupon repository", { id });
        try {
            const deletedCoupon = await prisma.coupon.delete({ where: { id } });
            logger.info("Exiting deleteCoupon repository", { deletedCoupon });
            return deletedCoupon;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in deleteCoupon repository", error.message);
                throw error;
            } else {
                logger.error("Unknown error in deleteCoupon repository");
                throw new Error("Something went wrong in deleteCoupon");
            }
        }
    }
}