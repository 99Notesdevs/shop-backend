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
exports.CouponRepository = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const prisma_1 = require("../config/prisma");
class CouponRepository {
    static createCoupon(coupon) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering createCoupon repository", { coupon });
            try {
                const newCoupon = yield prisma_1.prisma.coupon.create({ data: coupon });
                logger_1.default.info("Exiting createCoupon repository", { newCoupon });
                return newCoupon;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in createCoupon repository", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in createCoupon repository");
                    throw new Error("Something went wrong in createCoupon");
                }
            }
        });
    }
    static findCouponByType(code) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering findCouponByType repository", { code });
            try {
                const coupon = yield prisma_1.prisma.coupon.findUnique({ where: { code } });
                logger_1.default.info("Exiting findCouponByType repository", { coupon });
                return coupon;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in findCouponByType repository", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in findCouponByType repository");
                    throw new Error("Something went wrong in findCouponByType");
                }
            }
        });
    }
    static findAllCoupons() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering findAllCoupons repository");
            try {
                const coupons = yield prisma_1.prisma.coupon.findMany({
                    orderBy: { createdAt: "desc" },
                });
                logger_1.default.info("Exiting findAllCoupons repository", { coupons });
                return coupons;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in findAllCoupons repository", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in findAllCoupons repository");
                    throw new Error("Something went wrong in findAllCoupons");
                }
            }
        });
    }
    static findCouponById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering findCouponById repository", { id });
            try {
                const coupon = yield prisma_1.prisma.coupon.findUnique({ where: { id } });
                logger_1.default.info("Exiting findCouponById repository", { coupon });
                return coupon;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in findCouponById repository", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in findCouponById repository");
                    throw new Error("Something went wrong in findCouponById");
                }
            }
        });
    }
    static updateCoupon(id, coupon) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateCoupon repository", { id, coupon });
            try {
                const updatedCoupon = yield prisma_1.prisma.coupon.update({ where: { id }, data: coupon });
                logger_1.default.info("Exiting updateCoupon repository", { updatedCoupon });
                return updatedCoupon;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in updateCoupon repository", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in updateCoupon repository");
                    throw new Error("Something went wrong in updateCoupon");
                }
            }
        });
    }
    static deleteCoupon(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering deleteCoupon repository", { id });
            try {
                const deletedCoupon = yield prisma_1.prisma.coupon.delete({ where: { id } });
                logger_1.default.info("Exiting deleteCoupon repository", { deletedCoupon });
                return deletedCoupon;
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in deleteCoupon repository", error.message);
                    throw error;
                }
                else {
                    logger_1.default.error("Unknown error in deleteCoupon repository");
                    throw new Error("Something went wrong in deleteCoupon");
                }
            }
        });
    }
}
exports.CouponRepository = CouponRepository;
