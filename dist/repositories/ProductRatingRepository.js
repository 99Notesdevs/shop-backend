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
exports.ProductRatingRepository = void 0;
const prisma_1 = require("../config/prisma");
const logger_1 = __importDefault(require("../utils/logger"));
class ProductRatingRepository {
    static getProductRatingsByUserIdForProduct(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getAllProductRatings repository method");
            const productRatings = yield prisma_1.prisma.productRating.findFirst({
                where: { userId, productId }
            });
            logger_1.default.info("Exiting getAllProductRatings repository method");
            const rating = productRatings === null || productRatings === void 0 ? void 0 : productRatings.rating;
            return rating;
        });
    }
    static getProductReviews(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getProductReview repository method");
            const productReviews = yield prisma_1.prisma.productRating.findMany({
                where: { productId },
                select: { userId: true, review: true }
            });
            logger_1.default.info("Exiting getProductReview repository method");
            return productReviews;
        });
    }
    static getProductReviewByUserIdForProduct(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getProductReview repository method");
            const productReviews = yield prisma_1.prisma.productRating.findMany({
                where: { userId, productId },
                select: { userId: true, review: true }
            });
            logger_1.default.info("Exiting getProductReview repository method");
            return productReviews;
        });
    }
    static getGlobalProductRating(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getGlobalProductRating repository method");
            const result = yield prisma_1.prisma.productRating.aggregate({
                _avg: {
                    rating: true
                },
                where: { productId }
            });
            logger_1.default.info("Exiting getGlobalProductRating repository method");
            const globalProductRating = result._avg.rating;
            return globalProductRating;
        });
    }
    static createProductRating(productId, userId, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering createProductRating repository method");
            // Create new rating
            const createdProductRating = yield prisma_1.prisma.productRating.create({
                data: {
                    productId,
                    userId,
                    rating
                }
            });
            logger_1.default.info("Exiting createProductRating repository method");
            return createdProductRating;
        });
    }
    static updateProductRating(productId, userId, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateProductRating repository method");
            // First find the rating id using productId and userId
            const existingRating = yield prisma_1.prisma.productRating.findFirst({
                where: { productId, userId },
                select: { id: true }
            });
            if (!existingRating) {
                throw new Error('Rating not found');
            }
            const updatedProductRating = yield prisma_1.prisma.productRating.update({
                where: { id: existingRating.id },
                data: { rating }
            });
            logger_1.default.info("Exiting updateProductRating repository method");
            return updatedProductRating;
        });
    }
    static updateProductReview(productId, userId, review) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateProductRating repository method");
            // First find the rating id using productId and userId
            const existingRating = yield prisma_1.prisma.productRating.findFirst({
                where: {
                    productId,
                    userId
                }
            });
            if (!existingRating) {
                throw new Error('Rating not found');
            }
            // Then update using the found id
            const updatedReview = yield prisma_1.prisma.productRating.update({
                where: {
                    id: existingRating.id
                },
                data: {
                    review
                }
            });
            logger_1.default.info("Exiting updateProductRating repository method");
            return updatedReview;
        });
    }
    static deleteProductRating(productId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering deleteProductRating repository method");
            // First find the rating id using productId and userId
            const existingRating = yield prisma_1.prisma.productRating.findFirst({
                where: { productId, userId },
                select: { id: true }
            });
            if (!existingRating) {
                throw new Error('Rating not found');
            }
            const deletedProductRating = yield prisma_1.prisma.productRating.delete({
                where: { id: existingRating.id }
            });
            logger_1.default.info("Exiting deleteProductRating repository method");
            return deletedProductRating;
        });
    }
}
exports.ProductRatingRepository = ProductRatingRepository;
