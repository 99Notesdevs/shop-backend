import { prisma } from "../config/prisma";
import logger from "../utils/logger";

interface Address {
    id?: number;
    userId: number;
    name: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phoneNumber: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class AddressRepository {
    static async createAddress(addressData: Address){
        logger.info("Entering createAddress repository method", { userId: addressData.userId });
        const address = await prisma.address.create({ 
            data: addressData 
        });
        logger.info("Exiting createAddress repository method", { addressId: address.id });
        return address;
    }

    static async getAddressesByUserId(userId: number){
        logger.info("Entering getAddressesByUserId repository method", { userId });
        const addresses = await prisma.address.findMany({ 
            where: { userId },
            orderBy: { createdAt: 'desc' }
        });
        logger.info("Exiting getAddressesByUserId repository method", { count: addresses.length });
        return addresses;
    }

    static async updateAddress(userId: number, addressData: Partial<Omit<Address, 'id' | 'userId' | 'createdAt' | 'updatedAt'>> & { id: number }) {
        logger.info("Entering updateAddress repository method", { 
            addressId: addressData.id,
            userId
        });
        
        const { id, ...updateData } = addressData;
        
        const address = await prisma.address.update({ 
            where: { 
                id,
                userId // Ensure the address belongs to the user
            },
            data: updateData
        });
        
        logger.info("Exiting updateAddress repository method", { 
            addressId: address.id,
            success: true 
        });
        
        return address;
    }

    static async deleteAddress(addressId: number){
        logger.info("Entering deleteAddress repository method", { addressId });
        
        // Check if address is used in any orders
        const isUsed = await this.isAddressUsed(addressId);
        if (isUsed) {
            throw new Error('Cannot delete address as it is being used in existing orders');
        }

        const address = await prisma.address.delete({ 
            where: { id: addressId } 
        });
        
        logger.info("Exiting deleteAddress repository method", { addressId });
        return address;
    }

    static async getAddressesByOrderId(userId: number, orderId: number){
        logger.info("Getting addresses for order", { orderId });
        const order = await prisma.order.findUnique({
            where: { id: orderId },
            include: {
                user: true,
                billingAddress: true,
                shippingAddress: true
            }
        });
        if (!order) {
            throw new Error('Order not found');
        }
        if (order.userId !== userId) {
            throw new Error('Access denied');
        }
        return {
            billingAddress: order.billingAddress,
            shippingAddress: order.shippingAddress
        };
    }

    private static async isAddressUsed(addressId: number){
        const [billingCount, shippingCount] = await Promise.all([
            prisma.order.count({ where: { billingAddressId: addressId } }),
            prisma.order.count({ where: { shippingAddressId: addressId } })
        ]);
        return billingCount > 0 || shippingCount > 0;
    }
}