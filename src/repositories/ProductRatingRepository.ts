import { prisma } from "../config/prisma";
import logger from "../utils/logger";

export class ProductRatingRepository {
    static async getProductRatingsByUserIdForProduct(userId: number, productId: number) {
        logger.info("Entering getAllProductRatings repository method");
        const productRatings = await prisma.productRating.findFirst({
            where: { userId, productId }
        });
        logger.info("Exiting getAllProductRatings repository method");
        const rating = productRatings?.rating;
        return rating;
    }
    static async getProductReviews(productId: number) {
        logger.info("Entering getProductReview repository method");
        const productReviews = await prisma.productRating.findMany({
            where: { productId },
            select: { userId: true, review: true }
        });
        logger.info("Exiting getProductReview repository method");
        return productReviews;
    }
    static async getProductReviewByUserIdForProduct(userId: number, productId: number) {
        logger.info("Entering getProductReview repository method");
        const productReviews = await prisma.productRating.findMany({
            where: { userId, productId },
            select: { userId: true, review: true }
        });
        logger.info("Exiting getProductReview repository method");
        return productReviews;
    }
    static async getGlobalProductRating(productId: number) {
        logger.info("Entering getGlobalProductRating repository method");
        const result = await prisma.productRating.aggregate({
            _avg: {
                rating: true
            },
            where: { productId }
        });
        logger.info("Exiting getGlobalProductRating repository method");
        const globalProductRating = result._avg.rating;
        return globalProductRating;
    }

    static async createProductRating(productId: number, userId: number, rating: number) {
        logger.info("Entering createProductRating repository method");
        // Create new rating
        const createdProductRating = await prisma.productRating.create({
            data: {
                productId,
                userId,
                rating
            }
        });
        
        logger.info("Exiting createProductRating repository method");
        return createdProductRating;
    }

    static async updateProductRating(productId: number, userId: number, rating: number) {
        logger.info("Entering updateProductRating repository method");
        // First find the rating id using productId and userId
        const existingRating = await prisma.productRating.findFirst({
            where: { productId, userId },
            select: { id: true }
        });

        if (!existingRating) {
            throw new Error('Rating not found');
        }

        const updatedProductRating = await prisma.productRating.update({
            where: { id: existingRating.id },
            data: { rating }
        });
        logger.info("Exiting updateProductRating repository method");
        return updatedProductRating;
    }

    static async updateProductReview(productId: number, userId: number, review: string) {
        logger.info("Entering updateProductRating repository method");
        // First find the rating id using productId and userId
        const existingRating = await prisma.productRating.findFirst({
            where: { 
                productId,
                userId 
            }
        });
    
        if (!existingRating) {
            throw new Error('Rating not found');
        }
    
        // Then update using the found id
        const updatedReview = await prisma.productRating.update({
            where: { 
                id: existingRating.id 
            },
            data: { 
                review 
            }
        });
        logger.info("Exiting updateProductRating repository method");
        return updatedReview;
    }

    static async deleteProductRating(productId: number, userId: number) {
        logger.info("Entering deleteProductRating repository method");
        // First find the rating id using productId and userId
        const existingRating = await prisma.productRating.findFirst({
            where: { productId, userId },
            select: { id: true }
        });

        if (!existingRating) {
            throw new Error('Rating not found');
        }

        const deletedProductRating = await prisma.productRating.delete({
            where: { id: existingRating.id }
        });
        logger.info("Exiting deleteProductRating repository method");
        return deletedProductRating;
    }
}