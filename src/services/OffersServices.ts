import { OffersRepository } from "../repositories/OffersRepository";
import logger from "../utils/logger";

export class OffersService {
    static async createOffer(offerData: any) {
        logger.info("Entering createOffer service");

        const newOffer = await OffersRepository.createOffer(offerData);

        logger.info("Exiting createOffer service", { offerId: newOffer.id });
        return newOffer;
    }
    static async getAllOffers() {
        logger.info("Entering getAllOffers service");

        const offers = await OffersRepository.getAllOffers();

        logger.info("Exiting getAllOffers service", { offers });
        return offers;
    }
    static async getOfferById(id: number) {
        logger.info("Entering getOfferById service");

        const offer = await OffersRepository.getOfferById(id);

        logger.info("Exiting getOfferById service", { offer });
        return offer;
    }
    static async updateOffer(id: number, offerData: any) {
        logger.info("Entering updateOffer service");

        const updatedOffer = await OffersRepository.updateOffer(id, offerData);

        logger.info("Exiting updateOffer service", { offerId: updatedOffer.id });
        return updatedOffer;
    }
    static async deleteOffer(id: number) {
        logger.info("Entering deleteOffer service");

        const deletedOffer = await OffersRepository.deleteOffer(id);

        logger.info("Exiting deleteOffer service", { offerId: deletedOffer.id });
        return deletedOffer;
    }
}
