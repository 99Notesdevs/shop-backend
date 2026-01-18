"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressService = void 0;
const AddressRepository_1 = require("../repositories/AddressRepository");
class AddressService {
    static createAddress(userId, addressData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate required fields
            if (!addressData.addressLine1 || !addressData.city || !addressData.state ||
                !addressData.zipCode || !addressData.country || !addressData.phoneNumber) {
                throw new Error('Missing required address fields');
            }
            // Create the address with the user ID
            return AddressRepository_1.AddressRepository.createAddress(Object.assign(Object.assign({}, addressData), { userId }));
        });
    }
    static getUserAddresses(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new Error('User ID is required');
            }
            return AddressRepository_1.AddressRepository.getAddressesByUserId(userId);
        });
    }
    static updateAddress(userId, addressId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            // First verify the address belongs to the user
            const addresses = yield AddressRepository_1.AddressRepository.getAddressesByUserId(userId);
            const addressExists = addresses.some((addr) => addr.id === addressId);
            if (!addressExists) {
                throw new Error('Address not found or access denied');
            }
            return AddressRepository_1.AddressRepository.updateAddress(userId, Object.assign({ id: addressId }, updateData));
        });
    }
    static deleteAddress(userId, addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            // First verify the address belongs to the user
            const addresses = yield AddressRepository_1.AddressRepository.getAddressesByUserId(userId);
            const addressExists = addresses.some((addr) => addr.id === addressId);
            if (!addressExists) {
                throw new Error('Address not found or access denied');
            }
            return AddressRepository_1.AddressRepository.deleteAddress(addressId);
        });
    }
    static getOrderAddresses(userId, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!userId) {
                throw new Error('User ID is required');
            }
            return AddressRepository_1.AddressRepository.getAddressesByOrderId(userId, orderId);
        });
    }
}
exports.AddressService = AddressService;
