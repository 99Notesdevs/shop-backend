import { AddressRepository } from "../repositories/AddressRepository";
interface Address {
    id?: number;
    userId: number;
    name:string;
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
export class AddressService {
    static async createAddress(userId: number, addressData: Address) {
        // Validate required fields
        if (!addressData.addressLine1 || !addressData.city || !addressData.state || 
            !addressData.zipCode || !addressData.country || !addressData.phoneNumber) {
            throw new Error('Missing required address fields');
        }

        // Create the address with the user ID
        return AddressRepository.createAddress({
            ...addressData,
              userId
        });
    }

    static async getUserAddresses(userId: number) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        return AddressRepository.getAddressesByUserId(userId);
    }

    static async updateAddress(userId: number, addressId: number, updateData: Partial<Omit<Address, 'id' | 'userId'>>) {
        // First verify the address belongs to the user
        const addresses = await AddressRepository.getAddressesByUserId(userId);
        const addressExists = addresses.some((addr: Address) => addr.id === addressId);
        
        if (!addressExists) {
            throw new Error('Address not found or access denied');
        }

        return AddressRepository.updateAddress(userId, {
            id: addressId,
            ...updateData
        } as any);
    }

    static async deleteAddress(userId: number, addressId: number) {
        // First verify the address belongs to the user
        const addresses = await AddressRepository.getAddressesByUserId(userId);
        const addressExists = addresses.some((addr: Address) => addr.id === addressId);
        
        if (!addressExists) {
            throw new Error('Address not found or access denied');
        }

        return AddressRepository.deleteAddress(addressId);
    }

    static async getOrderAddresses(userId: number, orderId: number) {
        if (!userId) {
            throw new Error('User ID is required');
        }
        
        return AddressRepository.getAddressesByOrderId(userId, orderId);
    }
}