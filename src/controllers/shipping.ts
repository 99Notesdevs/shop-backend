import logger from '../utils/logger';
import { Request, Response } from 'express';
import { ShippingService } from '../services/ShippingService';  

export class ShippingController {
    // static async getAllShippingOptions(req: Request, res: Response) {
    //     try {
    //         logger.info('Fetching categories');
    //         const shippingOptions = await ShippingService.getAllShippingOptions();  
    //         if (!shippingOptions) {
    //             logger.error('No categories found');
    //             res.status(404).json({ success: false, message: 'No categories found' });
    //         }
    //         logger.info('Categories fetched successfully');
    //         res.status(200).json({success: true, data: shippingOptions});
    //     } catch (error: unknown) {
    //         if(error instanceof Error) {
    //             logger.error(`Error fetching categories: ${error.message}`);
    //             res.status(404).json({success:false, message: error.message });
    //         }
    //         else {
    //             logger.error('Unexpected error fetching categories');
    //             res.status(500).json({success: false, message: 'Internal server error' });
    //         }
    //     }
    // }

    static async addShippingDetails(req: Request, res: Response) {
        try {
            const orderId = req.params.id;
            logger.info(`Fetching category with ID: ${orderId}`);
            const category = await ShippingService.addShippingDetails(parseInt(orderId));
            if (!category) {
                logger.error(`Category with ID ${orderId} not found`);
                res.status(404).json({ success: false, message: 'Category not found' });
            }
            logger.info('Category fetched successfully');
            res.status(200).json({success: true, data: category});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error fetching category: ${error.message}`);
                res.status(404).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error fetching category');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async updateShippingDetails(req: Request, res: Response) {
        try {
            const orderId = req.params.id;
            logger.info(`Fetching category with ID: ${orderId}`);
            const category = await ShippingService.updateShippingDetails(parseInt(orderId));
            if (!category) {
                logger.error(`Category with ID ${orderId} not found`);
                res.status(404).json({ success: false, message: 'Category not found' });
            }
            logger.info('Category fetched successfully');
            res.status(200).json({success: true, data: category});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error fetching category: ${error.message}`);
                res.status(404).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error fetching category');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }
    static async trackShipping(req: Request, res: Response) {
        try {
            const categoryData = req.body;
            logger.info('Creating new category');
            const data = {
                name: categoryData.name,
                description: categoryData.description,
            }
            const newCategory = await ShippingService.trackShipping(parseInt(categoryData.orderId));
            logger.info('Category created successfully');
            res.status(201).json({success: true, data: newCategory});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error creating category: ${error.message}`);
                res.status(400).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error creating category');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }
    static async deleteShippingDetails(req: Request, res: Response) {
        try {
            const orderId = req.params.id;
            logger.info(`Fetching category with ID: ${orderId}`);
            const category = await ShippingService.deleteShippingDetails(parseInt(orderId));
            if (!category) {
                logger.error(`Category with ID ${orderId} not found`);
                res.status(404).json({ success: false, message: 'Category not found' });
            }
            logger.info('Category fetched successfully');
            res.status(200).json({success: true, data: category});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error fetching category: ${error.message}`);
                res.status(404).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error fetching category');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }
}