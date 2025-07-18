import logger from '../utils/logger';
import { Request, Response } from 'express';
import { CartService } from '../services/CartService';

export class CartController {
    static async getCartByUserId(req: Request, res: Response) {
        try {
            if(!req.body.authUser) {
                logger.error('No user ID provided');
                res.status(400).json({ success: false, message: 'No user ID provided' });
            }
            const userId = req.body.authUser;
            logger.info(`Fetching cart for user ${userId}`);
            const cart = await CartService.getCartByUserId(parseInt(userId));
            if (!cart) {
                logger.error('No cart found');
                res.status(404).json({ success: false, message: 'No cart found' });
            }
            logger.info('Cart fetched successfully');
            res.status(200).json({success: true, data: cart});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error fetching cart: ${error.message}`);
                res.status(404).json({success:false, message: error.message });
            }
            else {
                logger.error('Unexpected error fetching cart');
                res.status(500).json({success: false, message: 'Internal server error' });
            }
        }
    }

    static async addItemToCart(req: Request, res: Response) {
        try {
            const cartId = req.params.cartId;
            const productId = req.params.productId;
            const quantity = req.params.quantity;
            logger.info(`Adding item to cart: ${cartId}`);
            const cartItem = await CartService.addItemToCart(parseInt(cartId), parseInt(productId), parseInt(quantity));
            if (!cartItem) {
                logger.error(`Item not found`);
                res.status(404).json({ success: false, message: 'Item not found' });
            }
            logger.info('Item added to cart successfully');
            res.status(200).json({success: true, data: cartItem});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error adding item to cart: ${error.message}`);
                res.status(404).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error adding item to cart');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async updateCartItem(req: Request, res: Response) {
        try {
            const cartItemId = req.params.cartItemId;
            const productId = req.params.productId;
            const quantity = req.params.quantity;
            logger.info('Updating cart item');
            const updatedCartItem = await CartService.updateCartItem(parseInt(cartItemId), parseInt(productId), parseInt(quantity));
            logger.info('Cart item updated successfully');
            res.status(201).json({success: true, data: updatedCartItem});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error updating cart item: ${error.message}`);
                res.status(400).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error updating cart item');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async removeCartItem(req: Request, res: Response) {
        try {
            const cartId = req.params.cartId;
            const cartItemId = req.params.cartItemId;
            logger.info(`Deleting cart item with ID: ${cartItemId}`);
            const updateCategory = await CartService.removeCartItem(parseInt(cartId), parseInt(cartItemId));
            if (!updateCategory) {
                logger.error(`Cart item with ID ${cartItemId} not found`);
                res.status(404).json({ success: false, message: 'Cart item not found' });
            }
            logger.info('Cart item deleted successfully');
            res.status(200).json({success: true, data: updateCategory});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error deleting cart item: ${error.message}`);
                res.status(404).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error deleting cart item');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async clearCart(req: Request, res: Response) {
        try {
            const cartId = req.params.cartId;
            logger.info(`Deleting cart with ID: ${cartId}`);
            const deletedCart = await CartService.clearCart(parseInt(cartId));
            if (!deletedCart) {
                logger.error(`Cart with ID ${cartId} not found`);
                res.status(404).json({ success: false, message: 'Cart not found' });
            }
            logger.info('Cart deleted successfully');
            res.status(200).json({success: true, data: deletedCart});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error deleting cart: ${error.message}`);
                res.status(404).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error deleting cart');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }
}