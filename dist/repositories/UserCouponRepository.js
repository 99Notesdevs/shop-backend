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
exports.UserCouponRepository = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const prisma_1 = require("../config/prisma");
class UserCouponRepository {
    static getUserCoupons(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getUserCoupons repository", { userId });
            try {
                const userCoupons = yield prisma_1.prisma.userCoupon.findMany({
                    where: {
                        userId,
                    },
                });
                logger_1.default.info("Exiting getUserCoupons repository", { userCoupons });
                return userCoupons;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in getUserCoupons repository", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in getUserCoupons repository");
                    throw new Error("Something went wrong in getUserCoupons");
                }
            }
        });
    }
    static createUserCoupon(userId, couponId, usageLimit) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering createUserCoupon repository", { userId, couponId });
            try {
                const userCoupon = yield prisma_1.prisma.userCoupon.upsert({
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
                        timesUsed: 1
                    },
                    update: {
                        usageLimit,
                        timesUsed: {
                            increment: 1
                        }
                    }
                });
                logger_1.default.info("Exiting createUserCoupon repository", { userCoupon });
                return userCoupon;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in createUserCoupon repository", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in createUserCoupon repository");
                    throw new Error("Something went wrong in createUserCoupon");
                }
            }
        });
    }
    static removeUserCoupon(userId, couponId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering removeUserCoupon repository", { userId, couponId });
            try {
                const userCoupon = yield prisma_1.prisma.userCoupon.delete({
                    where: {
                        userId_couponId: {
                            userId,
                            couponId
                        }
                    }
                });
                logger_1.default.info("Exiting removeUserCoupon repository", { userCoupon });
                return userCoupon;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in removeUserCoupon repository", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in removeUserCoupon repository");
                    throw new Error("Something went wrong in removeUserCoupon");
                }
            }
        });
    }
}
exports.UserCouponRepository = UserCouponRepository;
