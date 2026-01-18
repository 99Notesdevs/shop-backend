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
exports.ProductRatingService = void 0;
const ProductRatingRepository_1 = require("../repositories/ProductRatingRepository");
const logger_1 = __importDefault(require("../utils/logger"));
class ProductRatingService {
    static getProductRatingsByUserIdForProduct(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getAllProductRatings service");
            const productRatings = yield ProductRatingRepository_1.ProductRatingRepository.getProductRatingsByUserIdForProduct(userId, productId);
            logger_1.default.info("Exiting getAllProductRatings service");
            return productRatings;
        });
    }
    static getGlobalProductRating(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getGlobalProductRating service");
            const globalProductRating = yield ProductRatingRepository_1.ProductRatingRepository.getGlobalProductRating(productId);
            logger_1.default.info("Exiting getGlobalProductRating service");
            return globalProductRating;
        });
    }
    static getProductReviews(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getProductReviews service");
            const productReviews = yield ProductRatingRepository_1.ProductRatingRepository.getProductReviews(productId);
            logger_1.default.info("Exiting getProductReviews service");
            return productReviews;
        });
    }
    static getProductReviewByUserIdForProduct(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getProductReviewByUserIdForProduct service");
            const productReviews = yield ProductRatingRepository_1.ProductRatingRepository.getProductReviewByUserIdForProduct(userId, productId);
            logger_1.default.info("Exiting getProductReviewByUserIdForProduct service");
            return productReviews;
        });
    }
    static createProductRating(productId, userId, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering createProductRating service");
            const createdProductRating = yield ProductRatingRepository_1.ProductRatingRepository.createProductRating(productId, userId, rating);
            logger_1.default.info("Exiting createProductRating service");
            return createdProductRating;
        });
    }
    static updateProductRating(productId, userId, rating) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateProductRating service");
            const updatedProductRating = yield ProductRatingRepository_1.ProductRatingRepository.updateProductRating(productId, userId, rating);
            logger_1.default.info("Exiting updateProductRating service");
            return updatedProductRating;
        });
    }
    static updateProductReview(productId, userId, review) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateProductReview service");
            const updatedProductReview = yield ProductRatingRepository_1.ProductRatingRepository.updateProductReview(productId, userId, review);
            logger_1.default.info("Exiting updateProductReview service");
            return updatedProductReview;
        });
    }
    static deleteProductRating(productId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering deleteProductRating service");
            const deletedProductRating = yield ProductRatingRepository_1.ProductRatingRepository.deleteProductRating(productId, userId);
            logger_1.default.info("Exiting deleteProductRating service");
            return deletedProductRating;
        });
    }
}
exports.ProductRatingService = ProductRatingService;
