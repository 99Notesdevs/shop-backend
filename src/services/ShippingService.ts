import logger from "../utils/logger";
import { ShippingRepository } from "../repositories/ShippingRepository";
export class ShippingService {


    static async addShippingDetails(data: any) {
        logger.info("Adding shipping details");
        const shippingDetails = await ShippingRepository.addShippingDetails(data);
        return shippingDetails;
    }
    
    static async updateShippingDetails(data: any) {
        logger.info("Updating shipping details");
        const shippingDetails = await ShippingRepository.updateShippingDetails(data);
        return shippingDetails;
    }

    static async updateShippingStatus(data: any) {
        logger.info("Updating shipping status");
        const shippingDetails = await ShippingRepository.updateShippingStatus(data);
        return shippingDetails;
    }
    
    static async trackShipping(orderId: number) {
        logger.info("Tracking shipping");
        const shippingDetails = await ShippingRepository.trackShipping(orderId);
        return shippingDetails;
    }
    static async deleteShippingDetails(orderId: number) {
        logger.info("Deleting shipping details");
        const shippingDetails = await ShippingRepository.deleteShippingDetails(orderId);
        return shippingDetails;
    }
}