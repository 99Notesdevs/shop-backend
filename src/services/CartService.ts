import { CartRepository } from '../repositories/CartRepository';
import logger from '../utils/logger';

export class CartService {
    static async getCartByUserId(userId: number) {
        logger.info('Fetching all categories');
        const cart = await CartRepository.getCartByUserId(userId);
        if (!cart) {
            logger.error('No cart found');
            throw new Error('No cart found');
        }
        logger.info('Cart fetched successfully');
        return cart;
    }

    static async addItemToCart(cartId: number, productId: number, quantity: number) {
        logger.info(`Adding item to cart: ${cartId}`);
        const cartItem = await CartRepository.addItemToCart(cartId, productId, quantity);
        if (!cartItem) {
            logger.error(`Item with ID ${cartId} not found`);
            throw new Error('Item not found');
        }
        logger.info('Item added to cart successfully');
        return cartItem;
    }

    static async updateCartItem(cartItemId: number, quantity: number) {
        logger.info('Updating cart item');
        const updatedCartItem = await CartRepository.updateCartItem(cartItemId, quantity);
        if (!updatedCartItem) {
            logger.error('Error updating cart item');
            throw new Error('Error updating cart item');
        }
        logger.info('Cart item updated successfully');
        return updatedCartItem;
    }

    static async removeCartItem(cartId: number, cartItemId: number) {
        logger.info(`Deleting cart item with ID: ${cartItemId}`);
        const updatedCategory = await CartRepository.removeCartItem(cartId, cartItemId);
        if (!updatedCategory) {
            logger.error(`Error deleting cart item with ID ${cartItemId}`);
            throw new Error('Error deleting cart item');
        }
        logger.info('Cart item deleted successfully');
        return updatedCategory;
    }

    static async clearCart(cartId: number) {
        logger.info(`Deleting cart with ID: ${cartId}`);
        const deletedCart = await CartRepository.clearCart(cartId);
        if (!deletedCart) {
            logger.error(`Error deleting cart with ID ${cartId}`);
            throw new Error('Error deleting cart');
        }
        logger.info('Cart deleted successfully');
        return deletedCart;
    }
}