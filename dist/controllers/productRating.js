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
exports.ProductRatingController = void 0;
const ProductRatingService_1 = require("../services/ProductRatingService");
const logger_1 = __importDefault(require("../utils/logger"));
class ProductRatingController {
    static getProductRatingsByUserIdForProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const userId = req.authUser;
                const productRatings = yield ProductRatingService_1.ProductRatingService.getProductRatingsByUserIdForProduct(Number(userId), Number(productId));
                res.json({ success: true, data: productRatings });
            }
            catch (error) {
                logger_1.default.error("Error in getProductRatingsByUserIdForProduct controller: ", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    static getGlobalProductRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const productRatings = yield ProductRatingService_1.ProductRatingService.getGlobalProductRating(Number(productId));
                res.json({ success: true, data: productRatings });
            }
            catch (error) {
                logger_1.default.error("Error in getGlobalProductRating controller: ", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    static getProductReviews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const productReviews = yield ProductRatingService_1.ProductRatingService.getProductReviews(Number(productId));
                res.json({ success: true, data: productReviews });
            }
            catch (error) {
                logger_1.default.error("Error in getProductReviews controller: ", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    static getProductReviewByUserIdForProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const userId = req.authUser;
                const productReviews = yield ProductRatingService_1.ProductRatingService.getProductReviewByUserIdForProduct(Number(userId), Number(productId));
                res.json({ success: true, data: productReviews });
            }
            catch (error) {
                logger_1.default.error("Error in getProductReviewByUserIdForProduct controller: ", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    static createProductRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.authUser;
                const { productId } = req.params;
                const { rating } = req.body;
                const productRatings = yield ProductRatingService_1.ProductRatingService.createProductRating(Number(productId), Number(userId), Number(rating));
                res.json({ success: true, data: productRatings });
            }
            catch (error) {
                logger_1.default.error("Error in createProductRating controller: ", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    static updateProductRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.authUser;
                const { productId } = req.params;
                const { rating } = req.body;
                const productRatings = yield ProductRatingService_1.ProductRatingService.updateProductRating(Number(productId), Number(userId), Number(rating));
                res.json({ success: true, data: productRatings });
            }
            catch (error) {
                logger_1.default.error("Error in updateProductRating controller: ", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    static updateProductReview(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.authUser;
                const { productId } = req.params;
                const { review } = req.body;
                const productRatings = yield ProductRatingService_1.ProductRatingService.updateProductReview(Number(productId), Number(userId), review);
                res.json({ success: true, data: productRatings });
            }
            catch (error) {
                logger_1.default.error("Error in updateProductReview controller: ", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
    static deleteProductRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.authUser;
                const { productId } = req.params;
                const productRatings = yield ProductRatingService_1.ProductRatingService.deleteProductRating(Number(productId), Number(userId));
                res.json({ success: true, data: productRatings });
            }
            catch (error) {
                logger_1.default.error("Error in deleteProductRating controller: ", error);
                res.status(500).json({ error: "Internal server error" });
            }
        });
    }
}
exports.ProductRatingController = ProductRatingController;
