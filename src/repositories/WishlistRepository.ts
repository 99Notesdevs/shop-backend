import { prisma } from "../config/prisma";
import logger from "../utils/logger";

export class WishlistRepository {
    static async getWishlist(userId: number) {
        logger.info('Fetching wishlist from repository');
        const wishlist = await prisma.wishList.findUnique({
            where: { userId },
            include: { products: true }
        });
        if (!wishlist) {
            logger.warn(`Wishlist not found for user ID: ${userId}`);
            throw new Error('Wishlist not found');
        }
        return wishlist;
    }

    static async addItemToWishlist(userId: number, productId: number) {
        logger.info('Adding item to wishlist in repository');
        console.log("here",userId,productId);
        const wishlist = await prisma.wishList.update({
            where: { userId },
            data: {
                products: {
                    connect: { id: productId }
                }
            },
            include: { products: true }
        });
        if (!wishlist) {
            logger.warn(`Failed to add item to wishlist for user ID: ${userId}`);
            throw new Error('Failed to add item to wishlist');
        }
        return wishlist;
    }
    
    static async removeItemFromWishlist(userId: number, productId: number) {
        logger.info('Removing item from wishlist in repository');
        const wishlist = await prisma.wishList.update({
            where: { userId },
            data: {
                products: {
                    disconnect: { id: productId }
                }
            },
            include: { products: true }
        });
        if (!wishlist) {
            logger.warn(`Failed to remove item from wishlist for user ID: ${userId}`);
            throw new Error('Failed to remove item from wishlist');
        }
        return wishlist;
    }
}