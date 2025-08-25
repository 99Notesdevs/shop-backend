import { prisma } from "../config/prisma";
import logger from "../utils/logger";

export class OffersRepository {
    static async createOffer(offerData: any) {
        try {
            const offer = await prisma.offers.create({
                data: offerData,
            });
            logger.info("Offer created successfully");
            return offer;
        } catch (error) {
            logger.error("Error creating offer", error);
            throw error;
        }
    }
    static async getAllOffers() {
        try {
            const offers = await prisma.offers.findMany();
            logger.info("Offers fetched successfully");
            return offers;
        } catch (error) {
            logger.error("Error fetching offers", error);
            throw error;
        }
    }
    static async getOfferById(id: number) {
        try {
            const offer = await prisma.offers.findUnique({
                where: { id },
            });
            logger.info("Offer fetched successfully");
            return offer;
        } catch (error) {
            logger.error("Error fetching offer", error);
            throw error;
        }
    }
    static async updateOffer(id: number, offerData: any) {
        try {
            const offer = await prisma.offers.update({
                where: { id },
                data: offerData,
            });
            logger.info("Offer updated successfully");
            return offer;
        } catch (error) {
            logger.error("Error updating offer", error);
            throw error;
        }
    }
    static async deleteOffer(id: number) {
        try {
            const offer = await prisma.offers.delete({
                where: { id },
            });
            logger.info("Offer deleted successfully");
            return offer;
        } catch (error) {
            logger.error("Error deleting offer", error);
            throw error;
        }
    }
}