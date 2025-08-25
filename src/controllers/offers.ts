import { OffersService } from "../services/OffersServices";
import logger from "../utils/logger";
import { Request, Response } from "express";

export class OfferController{
    static async createOffer(req: Request, res: Response) {
        try {
            logger.info('Creating offer');
            const offer = await OffersService.createOffer(req.body);
            logger.info('Offer created successfully');
            res.status(201).json({ success: true, data: offer });
        } catch(error: unknown) {
            if(error instanceof Error) {
                logger.error(error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error('An unknown error occurred');
                res.status(500).json({ success: false, message: 'An unknown error occurred' });
            }
        }
    }
    static async getAllOffers(req: Request, res: Response) {
        try {
            logger.info('Fetching all offers');
            const offers = await OffersService.getAllOffers();
            if (offers.length === 0) {
                logger.info('No offers found');
                throw new Error('No offers found');
            }
            logger.info('Offers fetched successfully');
            res.status(200).json({ success: true, data: offers });
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
    static async getOfferById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            logger.info(`Fetching offer for ID: ${id}`);
            const offer = await OffersService.getOfferById(parseInt(id));
            if (!offer) {
                logger.info('Offer not found');
                throw new Error('Offer not found');
            }
            logger.info('Offer fetched successfully');
            res.status(200).json({ success: true, data: offer });
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
    static async updateOffer(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description, price } = req.body;
            logger.info(`Updating offer for ID: ${id}`);
            const offer = await OffersService.updateOffer(parseInt(id), { name, description, price });
            if (!offer) {
                logger.info('Offer not found');
                throw new Error('Offer not found');
            }
            logger.info('Offer updated successfully');
            res.status(200).json({ success: true, data: offer });
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
    static async deleteOffer(req: Request, res: Response) {
        try {
            const { id } = req.params;
            logger.info(`Deleting offer for ID: ${id}`);
            const offer = await OffersService.deleteOffer(parseInt(id));
            if (!offer) {
                logger.info('Offer not found');
                throw new Error('Offer not found');
            }
            logger.info('Offer deleted successfully');
            res.status(200).json({ success: true, data: offer });
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