import { prisma } from "../config/prisma";
import logger from "../utils/logger";


export class ShippingRepository {

    static async addShippingDetails(data: any) {
        logger.info("Adding shipping details");
        const shippingDetails = await prisma.shipping.create({
            data: {
                shippingAddress: data.shippingAddress,
                orderId: data.orderId,
                trackingNumber: data.trackingNumber,
                carrier: data.carrier,
                status: data.status,
                shippingDate: data.shippingDate,
            }
        });
        return shippingDetails;
    }

    static async updateShippingDetails(data: any) {
        logger.info("Updating shipping details");
        const shipping = await prisma.shipping.findFirst({
            where: { orderId: data.orderId }
        });
        if (!shipping) {
            logger.error("Shipping details not found");
            return null;
        }
        const shippingDetails = await prisma.shipping.update({
            where: {
                id: shipping.id,  // Use the id for the update
            },
            data: {
                shippingAddress: data.shippingAddress,
                trackingNumber: data.trackingNumber,
                carrier: data.carrier,
                status: data.status,
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
    
    static async deleteShippingDetails(orderId: number) {
        logger.info("Deleting shipping details");
        const shipping = await prisma.shipping.findFirst({
            where: { orderId: orderId }
        });
        if (!shipping) {
            logger.error("Shipping details not found");
            return null;
        }
        const shippingDetails = await prisma.shipping.delete({
            where: {
                id: shipping.id,  // Use the id for the update
            }
        });
        return shippingDetails;
    }
}