import { prisma } from "../config/prisma";
import logger from "../utils/logger";

export class CartRepository {
    static async getCartByUserId(userId: number) {
        logger.info('Fetching cart for user repository');
        const cart = await prisma.cart.findUnique({
            where: { userId },
            include: { cartItems: true }
        });
        if (!cart) {
            logger.warn('Cart not found for user', userId);
            throw new Error('Cart not found');
        }
        return cart;
    }

    static async addItemToCart(cartId: number, productId: number, quantity: number) {
        logger.info('Adding item to cart for user repository');
        console.log("cartId",cartId,"productId",productId,"quantity",quantity);
        const cart = await prisma.cart.update({
            where: { id: cartId },
            data: {
                cartItems: {
                    create: {
                        productId,
                        quantity
                    }
                }
            }
        });
        if (!cart) {
            logger.warn('Failed to add item to cart', { cartId, productId });
            throw new Error('Failed to add item to cart');
        }
        return cart;
    }

    static async updateCartItem(cartItemId: number, quantity: number) {
        logger.info('Updating cart item for user repository');
        const cartItem = await prisma.cartItem.update({
            where: { id: cartItemId },
            data: {
                quantity
            }
        });
        if (!cartItem) {
            logger.warn('Failed to update cart item', { cartItemId });
            throw new Error('Failed to update cart item');
        }
        return cartItem;
    }

    static async removeCartItem(cartId: number, cartItemId: number) {
        logger.info('Removing item from cart for user repository');
        const cart = await prisma.cart.update({
            where: { id: cartId },
            data: {
                cartItems: {
                    delete: { id: cartItemId }
                }
            }
        });
        if (!cart) {
            logger.warn('Failed to remove item from cart', { cartId, cartItemId });
            throw new Error('Failed to remove item from cart');
        }
        return cart;
    }

    static async clearCart(cartId: number) {
        logger.info('Clearing cart for user repository');
        const cart = await prisma.cart.update({
            where: { id: cartId },
            data: {
                cartItems: {
                    deleteMany: {}
                }
            }
        });
        if (!cart) {
            logger.warn('Failed to clear cart', { cartId });
            throw new Error('Failed to clear cart');
        }
        return cart;
    }
}