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
exports.CouponController = void 0;
const CouponService_1 = require("../services/CouponService");
const logger_1 = __importDefault(require("../utils/logger"));
class CouponController {
    static createCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering createCoupon controller", { req });
            try {
                const coupon = yield CouponService_1.CouponService.createCoupon(req.body);
                logger_1.default.info("Exiting createCoupon controller", { coupon });
                res.status(201).json({ success: true, data: coupon });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in createCoupon controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in createCoupon controller");
                    res.status(500).json({ success: false, message: "Something went wrong in createCoupon" });
                }
            }
        });
    }
    static getAllCoupons(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getAllCoupons controller");
            try {
                const coupons = yield CouponService_1.CouponService.getAllCoupons();
                logger_1.default.info("Exiting getAllCoupons controller", { coupons });
                res.status(200).json({ success: true, data: coupons });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in getAllCoupons controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in getAllCoupons controller");
                    res.status(500).json({ success: false, message: "Something went wrong in getAllCoupons" });
                }
            }
        });
    }
    static getCouponByType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getCouponByType controller", { req });
            try {
                const coupon = yield CouponService_1.CouponService.getCouponByType(req.params.code);
                logger_1.default.info("Exiting getCouponByType controller", { coupon });
                res.status(200).json({ success: true, data: coupon });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in getCouponByType controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in getCouponByType controller");
                    res.status(500).json({ success: false, message: "Something went wrong in getCouponByType" });
                }
            }
        });
    }
    static useCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering useCoupon controller", { req });
            const code = req.params.code;
            const userId = parseInt(req.authUser);
            const totalAmount = req.body.totalAmount;
            try {
                const coupon = yield CouponService_1.CouponService.useCoupon(code, userId, totalAmount);
                logger_1.default.info("Exiting useCoupon controller", { coupon });
                res.status(200).json({ success: true, data: coupon });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in useCoupon controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in useCoupon controller");
                    res.status(500).json({ success: false, message: "Something went wrong in useCoupon" });
                }
            }
        });
    }
    static removeCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering removeCoupon controller", { req });
            try {
                const code = req.params.code;
                const userId = parseInt(req.authUser);
                const order = req.body.order;
                const coupon = yield CouponService_1.CouponService.removeCoupon(code, userId, order);
                logger_1.default.info("Exiting removeCoupon controller", { coupon });
                res.status(200).json({ success: true, data: coupon });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in removeCoupon controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in removeCoupon controller");
                    res.status(500).json({ success: false, message: "Something went wrong in removeCoupon" });
                }
            }
        });
    }
    static getCouponById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getCouponById controller", { req });
            try {
                const coupon = yield CouponService_1.CouponService.getCouponById(parseInt(req.params.id));
                logger_1.default.info("Exiting getCouponById controller", { coupon });
                res.status(200).json({ success: true, data: coupon });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in getCouponById controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in getCouponById controller");
                    res.status(500).json({ success: false, message: "Something went wrong in getCouponById" });
                }
            }
        });
    }
    static updateCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateCoupon controller", { req });
            try {
                const coupon = yield CouponService_1.CouponService.updateCoupon(parseInt(req.params.id), req.body);
                logger_1.default.info("Exiting updateCoupon controller", { coupon });
                res.status(200).json({ success: true, data: coupon });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in updateCoupon controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in updateCoupon controller");
                    res.status(500).json({ success: false, message: "Something went wrong in updateCoupon" });
                }
            }
        });
    }
    static deleteCoupon(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering deleteCoupon controller", { req });
            try {
                const coupon = yield CouponService_1.CouponService.deleteCoupon(parseInt(req.params.id));
                logger_1.default.info("Exiting deleteCoupon controller", { coupon });
                res.status(200).json({ success: true, data: coupon });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in deleteCoupon controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in deleteCoupon controller");
                    res.status(500).json({ success: false, message: "Something went wrong in deleteCoupon" });
                }
            }
        });
    }
}
exports.CouponController = CouponController;
