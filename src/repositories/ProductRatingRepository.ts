import { prisma } from "../config/prisma";
import logger from "../utils/logger";
import { IProductRating } from "../interfaces/productRating.interface";

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
        console.log("productId", productId);
        console.log("userId", userId);
        console.log("rating", rating);
        // First, try to find if a rating already exists
        const existingRating = await prisma.productRating.findFirst({
            where: {
                productId,
                userId
            }
        });
        console.log("existingRating", existingRating);
        let createdProductRating;
        
        if (existingRating) {
            // Update existing rating
            createdProductRating = await prisma.productRating.update({
                where: {
                    id: existingRating.id
                },
                data: {
                    rating
                }
            });
        } else {
            // Create new rating
            createdProductRating = await prisma.productRating.create({
                data: {
                    productId,
                    userId,
                    rating
                }
            });
        }
        console.log("createdProductRating", createdProductRating);
        logger.info("Exiting createProductRating repository method");
        return createdProductRating;
    }

    static async updateProductRating(productId: number, userId: number, productRating: IProductRating) {
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
            data: productRating
        });
        logger.info("Exiting updateProductRating repository method");
        return updatedProductRating;
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