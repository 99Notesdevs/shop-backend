import logger from '../utils/logger';
import { WishlistRepository } from '../repositories/WishlistRepository';

export class WishlistService {
    static async getWishlist(userId: number) {
        logger.info('Fetching wishlist service');
        const wishlist = await WishlistRepository.getWishlist(userId);
        if (!wishlist) {
            logger.warn(`Wishlist not found for user ID: ${userId}`);
            throw new Error('Wishlist not found');
        }
        return wishlist;
    }

    static async addItemToWishlist(userId: number, productId: number) {
        logger.info('Adding item to wishlist service');
        const wishlist = await WishlistRepository.addItemToWishlist(userId, productId);
        if (!wishlist) {
            logger.warn(`Failed to add item to wishlist for user ID: ${userId}`);
            throw new Error('Failed to add item to wishlist');
        }
        return wishlist;
    }

    static async removeItemFromWishlist(userId: number, productId: number) {
        logger.info('Removing item from wishlist service');
        const wishlist = await WishlistRepository.removeItemFromWishlist(userId, productId);
        if (!wishlist) {
            logger.warn(`Failed to remove item from wishlist for user ID: ${userId}`);
            throw new Error('Failed to remove item from wishlist');
        }
        return wishlist;
    }
}