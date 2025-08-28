import { Request, Response } from "express";
import { AddressService } from "../services/AddressService";
import logger from "../utils/logger";

export class AddressController {
    static async createAddress(req: Request, res: Response) {
        try {
            const userId = parseInt(req.authUser!); // Assuming user is attached by auth middleware
            if (!userId) {
                return res.status(401).json({ success: false, error: 'Unauthorized' });
            }
            
            // Extract only the fields that belong to the Address model
            const { name, addressLine1, addressLine2, city, state, zipCode, country, phoneNumber } = req.body;
            
            const addressData = {
                userId,
                name,
                addressLine1,
                addressLine2,
                city,
                state,
                zipCode,
                country,
                phoneNumber
            };
            
            const address = await AddressService.createAddress(userId, addressData);
            res.status(200).json({ 
                success: true, 
                data: address 
            });
        } catch (error: any) {
            logger.error('Error creating address:', error);
            res.status(400).json({ success: false, error: error.message || 'Failed to create address' });
        }
    }

    static async getUserAddresses(req: Request, res: Response) {
        try {
            const userId = parseInt(req.authUser!);
            if (!userId) {
                return res.status(401).json({ success: false, error: 'Unauthorized' });
            }

            const addresses = await AddressService.getUserAddresses(userId);
            res.status(200).json({
                success: true,
                data: addresses
            });
        } catch (error: any) {
            logger.error('Error fetching user addresses:', error);
            res.status(500).json({ success: false, error: 'Failed to fetch addresses' });
        }
    }

    static async updateAddress(req: Request, res: Response) {
        try {
            const userId = parseInt(req.authUser!);
            const addressId = parseInt(req.params.id);
            
            if (!userId) {
                return res.status(401).json({ success: false, error: 'Unauthorized' });
            }
            if (isNaN(addressId)) {
                return res.status(400).json({ success: false, error: 'Invalid address ID' });
            }

            // Only allow updating specific fields
            const { name, addressLine1, addressLine2, city, state, zipCode, country, phoneNumber } = req.body;
            const updateData = {
                name,
                addressLine1,
                addressLine2,
                city,
                state,
                zipCode,
                country,
                phoneNumber
            };

            const updatedAddress = await AddressService.updateAddress(userId, addressId, updateData);
            res.status(200).json({ 
                success: true, 
                data: updatedAddress 
            });
        } catch (error: any) {
            logger.error('Error updating address:', error);
            res.status(400).json({ success: false, error: error.message || 'Failed to update address' });
        }
    }

    static async deleteAddress(req: Request, res: Response) {
        try {
            const userId = parseInt(req.authUser!);
            const addressId = parseInt(req.params.id);
            
            if (!userId) {
                return res.status(401).json({ error: 'Unauthorized' });
            }
            if (isNaN(addressId)) {
                return res.status(400).json({ error: 'Invalid address ID' });
            }

            await AddressService.deleteAddress(userId, addressId);
            res.status(204).send();
        } catch (error: any) {
            logger.error('Error deleting address:', error);
            res.status(400).json({ success: false, error: error.message || 'Failed to delete address' });
        }
    }

    static async getOrderAddresses(req: Request, res: Response) {
        try {
            const userId = parseInt(req.authUser!);
            const orderId = parseInt(req.params.orderId);
            
            if (!userId) {
                return res.status(401).json({ success: false, error: 'Unauthorized' });
            }
            if (isNaN(orderId)) {
                return res.status(400).json({ success: false, error: 'Invalid order ID' });
            }

            const addresses = await AddressService.getOrderAddresses(userId, orderId);
            res.status(200).json({ 
                success: true, 
                data: addresses 
            });
        } catch (error: any) {
            logger.error('Error fetching order addresses:', error);
            res.status(400).json({ success: false, error: error.message || 'Failed to fetch order addresses' });
        }
    }
}