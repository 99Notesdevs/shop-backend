import { Request, Response } from 'express';
import logger from '../utils/logger';
import { InventoryService } from '../services/InventoryService';

export class InventoryController {
    static async getAllInventories(req: Request, res: Response) {
        try {
            logger.info('Fetching all inventories');
            const inventories = await InventoryService.getAllInventories();
            if (inventories.length === 0) {
                logger.info('No inventories found');
                throw new Error('No inventories found');
            }
            logger.info('Inventories fetched successfully');
            res.status(200).json({ success: true, data: inventories });
        } catch(error: unknown) {
            if(error instanceof Error) {
                logger.error(error.message);
                res.status(404).json({ success: false, message: error.message });
            } else {
                logger.error('An unknown error occurred');
                res.status(500).json({ success: false, message: 'An unknown error occurred' });
            }
        }
    }

    // {productId}
    static async getInventoryByProductId(req: Request, res: Response) {
        try {
            const { productId } = req.params;
            logger.info(`Fetching inventory for product ID: ${productId}`);
            const inventory = await InventoryService.getInventoryByProductId(parseInt(productId));
            if (!inventory) {
                logger.info('Inventory not found');
                throw new Error('Inventory not found');
            }
            logger.info('Inventory fetched successfully');
            res.status(200).json({ success: true, data: inventory });
        } catch(error: unknown) {
            if(error instanceof Error) {
                logger.error(error.message);
                res.status(404).json({ success: false, message: error.message });
            } else {
                logger.error('An unknown error occurred');
                res.status(500).json({ success: false, message: 'An unknown error occurred' });
            }
        }
    }

    // {productId}
    static async updateInventory(req: Request, res: Response) {
        try {
            const { productId } = req.params;
            const { quantity } = req.body;
            logger.info(`Updating inventory for product ID: ${productId}`);
            const updatedInventory = await InventoryService.updateInventory(parseInt(productId), parseInt(quantity));
            if (!updatedInventory) {
                logger.info('Inventory not found');
                throw new Error('Inventory not found');
            }
            logger.info('Inventory updated successfully');
            res.status(200).json({ success: true, data: updatedInventory });
        } catch(error: unknown) {
            if(error instanceof Error) {
                logger.error(error.message);
                res.status(404).json({ success: false, message: error.message });
            } else {
                logger.error('An unknown error occurred');
                res.status(500).json({ success: false, message: 'An unknown error occurred' });
            }
        }
    }
}