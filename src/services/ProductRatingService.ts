import { ProductRatingRepository } from "../repositories/ProductRatingRepository";
import logger from "../utils/logger";
import { IProductRating } from "../interfaces/productRating.interface";

export class ProductRatingService {
    static async getProductRatingsByUserIdForProduct(userId: number, productId: number) {
        logger.info("Entering getAllProductRatings service");
        const productRatings = await ProductRatingRepository.getProductRatingsByUserIdForProduct(userId, productId);
        logger.info("Exiting getAllProductRatings service");
        return productRatings;
    }
    static async getGlobalProductRating(productId: number) {
        logger.info("Entering getGlobalProductRating service");
        const globalProductRating = await ProductRatingRepository.getGlobalProductRating(productId);
        logger.info("Exiting getGlobalProductRating service");
        return globalProductRating;
    }
    static async getProductReviews(productId: number) {
        logger.info("Entering getProductReviews service");
        const productReviews = await ProductRatingRepository.getProductReviews(productId);
        logger.info("Exiting getProductReviews service");
        return productReviews;
    }
    static async getProductReviewByUserIdForProduct(userId: number, productId: number) {
        logger.info("Entering getProductReviewByUserIdForProduct service");
        const productReviews = await ProductRatingRepository.getProductReviewByUserIdForProduct(userId, productId);
        logger.info("Exiting getProductReviewByUserIdForProduct service");
        return productReviews;
    }
    static async createProductRating(productId: number, userId: number, rating: number) {
        logger.info("Entering createProductRating service");
        const createdProductRating = await ProductRatingRepository.createProductRating(productId, userId, rating);
        logger.info("Exiting createProductRating service");
        return createdProductRating;
    }
    static async updateProductRating(productId: number, userId: number, rating: number) {
        logger.info("Entering updateProductRating service");
        const updatedProductRating = await ProductRatingRepository.updateProductRating(productId, userId, rating);
        logger.info("Exiting updateProductRating service");
        return updatedProductRating;
    }
    static async updateProductReview(productId: number, userId: number, review: string) {
        logger.info("Entering updateProductReview service");
        const updatedProductReview = await ProductRatingRepository.updateProductReview(productId, userId, review);
        logger.info("Exiting updateProductReview service");
        return updatedProductReview;
    }
    static async deleteProductRating(productId: number, userId: number) {
        logger.info("Entering deleteProductRating service");
        const deletedProductRating = await ProductRatingRepository.deleteProductRating(productId, userId);
        logger.info("Exiting deleteProductRating service");
        return deletedProductRating;
    }
}
