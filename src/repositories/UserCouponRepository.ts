import logger from "../utils/logger";
import { prisma } from "../config/prisma";


export class UserCouponRepository {
    static async getUserCoupons(userId: number) {
        logger.info("Entering getUserCoupons repository", { userId });
        try {
            const userCoupons = await prisma.userCoupon.findMany({
                where: {
                    userId,
                },
            });
            logger.info("Exiting getUserCoupons repository", { userCoupons });
            return userCoupons;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in getUserCoupons repository", error.message);
                throw error;
            } else {
                logger.error("Unknown error in getUserCoupons repository");
                throw new Error("Something went wrong in getUserCoupons");
            }
        }
    }
    static async createUserCoupon(userId: number, couponId: number,usageLimit:number|null) {
        logger.info("Entering createUserCoupon repository", { userId, couponId });
        try {
            const userCoupon = await prisma.userCoupon.upsert({
                where: {
                    userId_couponId: {
                        userId,
                        couponId
                    }
                },
                create: {
                    userId,
                    couponId,
                    usageLimit,
                    timesUsed:1
                },
                update: {
                    usageLimit,
                    timesUsed:{
                        increment:1
                    }
                }
            });
            logger.info("Exiting createUserCoupon repository", { userCoupon });
            return userCoupon;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in createUserCoupon repository", error.message);
                throw error;
            } else {
                logger.error("Unknown error in createUserCoupon repository");
                throw new Error("Something went wrong in createUserCoupon");
            }
        }
    }
    static async removeUserCoupon(userId: number, couponId: number) {
        logger.info("Entering removeUserCoupon repository", { userId, couponId });
        try {
            const userCoupon = await prisma.userCoupon.delete({
                where: {
                    userId_couponId: {
                        userId,
                        couponId
                    }
                }
            });
            logger.info("Exiting removeUserCoupon repository", { userCoupon });
            return userCoupon;
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in removeUserCoupon repository", error.message);
                throw error;
            } else {
                logger.error("Unknown error in removeUserCoupon repository");
                throw new Error("Something went wrong in removeUserCoupon");
            }
        }
    }
}
