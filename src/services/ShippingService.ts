import logger from "../utils/logger";
import { ShippingRepository } from "../repositories/ShippingRepository";
export class ShippingService {
    static async getAllShippingOptions() {
        logger.info("Fetching all shipping options");
        const shippingOptions = await ShippingRepository.getAllShippingOptions();
        return shippingOptions;
    }

    static async addShippingDetails(data: any) {
        logger.info("Adding shipping details");
        const shippingDetails = await ShippingRepository.addShippingDetails(data);
        return shippingDetails;
    }
    
    static async trackShipping(orderId: number) {
        logger.info("Tracking shipping");
        const shippingDetails = await ShippingRepository.trackShipping(orderId);
        return shippingDetails;
    }
}