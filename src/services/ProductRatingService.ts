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
    static async createProductRating(productId: number, userId: number, rating: number) {
        logger.info("Entering createProductRating service");
        const createdProductRating = await ProductRatingRepository.createProductRating(productId, userId, rating);
        logger.info("Exiting createProductRating service");
        return createdProductRating;
    }
    static async updateProductRating(productId: number, userId: number, productRating: IProductRating) {
        logger.info("Entering updateProductRating service");
        const updatedProductRating = await ProductRatingRepository.updateProductRating(productId, userId, productRating);
        logger.info("Exiting updateProductRating service");
        return updatedProductRating;
    }
    static async deleteProductRating(productId: number, userId: number) {
        logger.info("Entering deleteProductRating service");
        const deletedProductRating = await ProductRatingRepository.deleteProductRating(productId, userId);
        logger.info("Exiting deleteProductRating service");
        return deletedProductRating;
    }
}
