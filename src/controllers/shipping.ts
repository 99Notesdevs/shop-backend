import logger from '../utils/logger';
import { Request, Response } from 'express';
import { ShippingService } from '../services/ShippingService';  

export class ShippingController {

    static async addShippingDetails(req: Request, res: Response) {
        try {
            const orderId = req.params.orderId;
            const shippingAddress = req.body.shippingAddress;
            const trackingNumber = req.body.trackingNumber;
            const carrier = req.body.carrier;
            const status = req.body.status;
            const shippingDate = req.body.shippingDate;
            if (!orderId || !shippingAddress || !trackingNumber || !carrier || !status || !shippingDate) {
                logger.error('Missing required fields');
                res.status(400).json({ success: false, message: 'Missing required fields' });
            }
            const data = {
                orderId: orderId,
                shippingAddress: shippingAddress,
                trackingNumber: trackingNumber,
                carrier: carrier,
                status: status,
                shippingDate: shippingDate,
            }
            logger.info(`Fetching category with ID: ${orderId}`);
            const shippingDetails = await ShippingService.addShippingDetails(data);
            if (!shippingDetails) {
                logger.error(`Shipping details with ID ${orderId} not found`);
                res.status(404).json({ success: false, message: 'Shipping details not found' });
            }
            logger.info('Shipping details fetched successfully');
            res.status(200).json({success: true, data: shippingDetails});
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

    static async updateShippingStatus(req: Request, res: Response) {
        try {
            const orderId = req.params.orderId;
            const status = req.body.status;
   
            if (!orderId || !status ) {
                logger.error('Missing required fields');
                res.status(400).json({ success: false, message: 'Missing required fields' });
            }
            const data = {
                orderId: orderId,
                status: status
            }
            logger.info(`Updating shipping status with ID: ${orderId}`);
            const shippingDetails = await ShippingService.updateShippingStatus(data);
            if (!shippingDetails) {
                logger.error(`Shipping details with ID ${orderId} not found`);
                res.status(404).json({ success: false, message: 'Shipping status not found' });
            }
            logger.info('Shipping details fetched successfully');
            res.status(200).json({success: true, data: shippingDetails});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error updating shipping status: ${error.message}`);
                res.status(404).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error updating shipping status');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }
    static async updateShippingDetails(req: Request, res: Response) {
        try {
            const orderId = req.params.orderId;
            const shippingAddress = req.body.shippingAddress;
            const trackingNumber = req.body.trackingNumber;
            const carrier = req.body.carrier;
            const status = req.body.status;
            const shippingDate = req.body.shippingDate;
            if (!orderId || !shippingAddress || !trackingNumber || !carrier || !status || !shippingDate) {
                logger.error('Missing required fields');
                res.status(400).json({ success: false, message: 'Missing required fields' });
            }
            const data = {
                orderId: orderId,
                shippingAddress: shippingAddress,
                trackingNumber: trackingNumber,
                carrier: carrier,
                status: status,
                shippingDate: shippingDate,
            }
            logger.info(`Updating shipping details with ID: ${orderId}`);
            const shippingDetails = await ShippingService.updateShippingDetails(data);
            if (!shippingDetails) {
                logger.error(`Shipping details with ID ${orderId} not found`);
                res.status(404).json({ success: false, message: 'Shipping details not found' });
            }
            logger.info('Shipping details fetched successfully');
            res.status(200).json({success: true, data: shippingDetails});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error updating shipping details: ${error.message}`);
                res.status(404).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error updating shipping details');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }
    static async trackShipping(req: Request, res: Response) {
        try {
            const orderId = req.params.orderId;
            logger.info(`Tracking shipping with ID: ${orderId}`);
            const shippingDetails = await ShippingService.trackShipping(parseInt(orderId));
            logger.info('Shipping details fetched successfully');
            res.status(201).json({success: true, data: shippingDetails});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error tracking shipping: ${error.message}`);
                res.status(400).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error tracking shipping');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }
    static async deleteShippingDetails(req: Request, res: Response) {
        try {
            const orderId = req.params.orderId;
            logger.info(`Deleting shipping details with ID: ${orderId}`);
            const shippingDetails = await ShippingService.deleteShippingDetails(parseInt(orderId));
            if (!shippingDetails) {
                logger.error(`Shipping details with ID ${orderId} not found`);
                res.status(404).json({ success: false, message: 'Shipping details not found' });
            }
            logger.info('Shipping details fetched successfully');
            res.status(200).json({success: true, data: shippingDetails});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error deleting shipping details: ${error.message}`);
                res.status(404).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error deleting shipping details');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }
}