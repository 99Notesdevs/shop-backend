import { prisma } from "../config/prisma";
import logger from "../utils/logger";


export class ShippingRepository {
    static async getAllShippingOptions() {
        logger.info("Fetching all shipping options");
        const shippingOptions = await prisma.shipping.findMany();
        return shippingOptions;
    }

    static async addShippingDetails(data: any) {
        logger.info("Adding shipping details");
        const shippingDetails = await prisma.shipping.create({
            data: {
                shippingAddress: data.shippingAddress,
                orderId: data.orderId,
                trackingNumber: data.trackingNumber,
                carrier: data.carrier,
                shippingDate: data.shippingDate,
            }
        });
        return shippingDetails;
    }

    static async trackShipping(orderId: number) {
        logger.info("Tracking shipping");
        const shippingDetails = await prisma.shipping.findMany({
            where: {
                orderId: orderId,
            }
        });
        return shippingDetails;
    }
}