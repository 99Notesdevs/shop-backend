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
exports.CouponService = void 0;
const CouponRepository_1 = require("../repositories/CouponRepository");
const logger_1 = __importDefault(require("../utils/logger"));
const UserCouponRepository_1 = require("../repositories/UserCouponRepository");
class CouponService {
    static createCoupon(coupon) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering createCoupon service", { coupon });
            try {
                const newCoupon = yield CouponRepository_1.CouponRepository.createCoupon(coupon);
                logger_1.default.info("Exiting createCoupon service", { newCoupon });
                return newCoupon;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in createCoupon service", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in createCoupon service");
                    throw new Error("Something went wrong in createCoupon");
                }
            }
        });
    }
    static getCouponByType(code) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getCouponByType service", { code });
            try {
                const coupon = yield CouponRepository_1.CouponRepository.findCouponByType(code);
                logger_1.default.info("Exiting getCouponByType service", { coupon });
                return coupon;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in getCouponByType service", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in getCouponByType service");
                    throw new Error("Something went wrong in getCouponByType");
                }
            }
        });
    }
    static getAllCoupons() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getAllCoupons service");
            try {
                const coupons = yield CouponRepository_1.CouponRepository.findAllCoupons();
                logger_1.default.info("Exiting getAllCoupons service", { coupons });
                return coupons;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in getAllCoupons service", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in getAllCoupons service");
                    throw new Error("Something went wrong in getAllCoupons");
                }
            }
        });
    }
    static useCoupon(code, userId, totalAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            logger_1.default.info("Entering useCoupon service", { code });
            try {
                const coupon = yield CouponRepository_1.CouponRepository.findCouponByType(code);
                // const order=await OrderRepository.getOrderById(orderId);
                // if(!order){
                //     throw new Error("Order not found");
                // }
                if (!coupon) {
                    throw new Error("Coupon not found");
                }
                if (coupon.endDate && coupon.endDate < new Date()) {
                    throw new Error("Coupon expired");
                }
                if (coupon.minOrderValue && coupon.minOrderValue > totalAmount) {
                    throw new Error("Order amount is less than minimum order value");
                }
                const updatedCoupon = yield CouponRepository_1.CouponRepository.updateCoupon(coupon.id, { timesUsed: (coupon.timesUsed || 0) + 1 });
                const userCoupon = yield UserCouponRepository_1.UserCouponRepository.createUserCoupon(userId, coupon.id, (_a = coupon.usageLimitPerUser) !== null && _a !== void 0 ? _a : null);
                logger_1.default.info("Exiting useCoupon service", { coupon });
                return coupon;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in useCoupon service", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in useCoupon service");
                    throw new Error("Something went wrong in useCoupon");
                }
            }
        });
    }
    static removeCoupon(code, userId, order) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering removeCoupon service", { code });
            try {
                const coupon = yield CouponRepository_1.CouponRepository.findCouponByType(code);
                if (!coupon) {
                    throw new Error("Coupon not found");
                }
                if (coupon.timesUsed > 0) {
                    const updatedCoupon = yield CouponRepository_1.CouponRepository.updateCoupon(coupon.id, { timesUsed: (coupon.timesUsed || 0) - 1 });
                }
                const userCoupon = yield UserCouponRepository_1.UserCouponRepository.removeUserCoupon(userId, coupon.id);
                logger_1.default.info("Exiting removeCoupon service", { coupon });
                return coupon;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in removeCoupon service", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in removeCoupon service");
                    throw new Error("Something went wrong in removeCoupon");
                }
            }
        });
    }
    static getCouponById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getCouponById service", { id });
            try {
                const coupon = yield CouponRepository_1.CouponRepository.findCouponById(id);
                logger_1.default.info("Exiting getCouponById service", { coupon });
                return coupon;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in getCouponById service", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in getCouponById service");
                    throw new Error("Something went wrong in getCouponById");
                }
            }
        });
    }
    static updateCoupon(id, coupon) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateCoupon service", { id, coupon });
            try {
                const updatedCoupon = yield CouponRepository_1.CouponRepository.updateCoupon(id, coupon);
                logger_1.default.info("Exiting updateCoupon service", { updatedCoupon });
                return updatedCoupon;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in updateCoupon service", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in updateCoupon service");
                    throw new Error("Something went wrong in updateCoupon");
                }
            }
        });
    }
    static deleteCoupon(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering deleteCoupon service", { id });
            try {
                const deletedCoupon = yield CouponRepository_1.CouponRepository.deleteCoupon(id);
                logger_1.default.info("Exiting deleteCoupon service", { deletedCoupon });
                return deletedCoupon;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in deleteCoupon service", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in deleteCoupon service");
                    throw new Error("Something went wrong in deleteCoupon");
                }
            }
        });
    }
}
exports.CouponService = CouponService;
