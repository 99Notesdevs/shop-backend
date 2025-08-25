import logger from '../utils/logger';
import { Request, Response } from 'express';
import { WishlistService } from '../services/WishlistService';

export class WishlistController {
    static async getWishlist(req: Request, res: Response) {
        try {
            logger.info('Fetching wishlist');
            if(!req.authUser) {
                logger.error('No user ID provided');
                throw new Error('No user ID provided');
            }
            const userId = req.authUser!;
            const wishlist = await WishlistService.getWishlist(Number(userId));
            if (!wishlist) {
                logger.error('No wishlist found');
                throw new Error('No wishlist found');
            }
            logger.info('Wishlist fetched successfully');
            res.status(200).json({success: true, data: wishlist});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error fetching wishlist: ${error.message}`);
                res.status(404).json({success:false, message: error.message });
            }
            else {
                logger.error('Unexpected error fetching wishlist');
                res.status(500).json({success: false, message: 'Internal server error' });
            }
        }
    }

    static async addItemToWishlist(req: Request, res: Response) {
        try {
            logger.info('Creating new wishlist');
            if(!req.authUser) {
                logger.error('No user ID provided');
                throw new Error('No user ID provided');
            }
            const userId = req.authUser!;

            if(!req.params.productId) {
                logger.error('No product ID provided');
                throw new Error('No product ID provided');
            }
            console.log("here",req.params.productId);
            const productId = req.params.productId;
            const newWishlist = await WishlistService.addItemToWishlist(Number(userId), Number(productId));
            logger.info('Wishlist created successfully');
            res.status(201).json({success: true, data: newWishlist});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error creating wishlist: ${error.message}`);
                res.status(400).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error creating wishlist');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async removeItemFromWishlist(req: Request, res: Response) {
        try {
            logger.info(`Deleting wishlist with ID: ${req.params.productId}`);
            if(!req.authUser) {
                logger.error('No user ID provided');
                throw new Error('No user ID provided');
            }
            const userId = req.authUser!;
            if(!req.params.productId) {
                logger.error('No product ID provided');
                throw new Error('No product ID provided');
            }
            const productId = req.params.productId;
            const deletedWishlist = await WishlistService.removeItemFromWishlist(Number(userId),Number(productId));
            if (!deletedWishlist) {
                logger.error(`Wishlist with ID ${productId} not found`);
                res.status(404).json({ success: false, message: 'Wishlist not found' });
            }
            logger.info('Wishlist deleted successfully');
            res.status(200).json({success: true, data: deletedWishlist});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error deleting wishlist: ${error.message}`);
                res.status(404).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error deleting wishlist');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }
}