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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const AddressService_1 = require("../services/AddressService");
const logger_1 = __importDefault(require("../utils/logger"));
class AddressController {
    static createAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.authUser); // Assuming user is attached by auth middleware
                if (!userId) {
                    return res.status(401).json({ success: false, error: 'Unauthorized' });
                }
                // Extract only the fields that belong to the Address model
                const { name, addressLine1, addressLine2, city, state, zipCode, country, phoneNumber } = req.body;
                const addressData = {
                    userId,
                    name,
                    addressLine1,
                    addressLine2,
                    city,
                    state,
                    zipCode,
                    country,
                    phoneNumber
                };
                const address = yield AddressService_1.AddressService.createAddress(userId, addressData);
                res.status(200).json({
                    success: true,
                    data: address
                });
            }
            catch (error) {
                logger_1.default.error('Error creating address:', error);
                res.status(400).json({ success: false, error: error.message || 'Failed to create address' });
            }
        });
    }
    static getUserAddresses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.authUser);
                if (!userId) {
                    return res.status(401).json({ success: false, error: 'Unauthorized' });
                }
                const addresses = yield AddressService_1.AddressService.getUserAddresses(userId);
                res.status(200).json({
                    success: true,
                    data: addresses
                });
            }
            catch (error) {
                logger_1.default.error('Error fetching user addresses:', error);
                res.status(500).json({ success: false, error: 'Failed to fetch addresses' });
            }
        });
    }
    static updateAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.authUser);
                const addressId = parseInt(req.params.id);
                if (!userId) {
                    return res.status(401).json({ success: false, error: 'Unauthorized' });
                }
                if (isNaN(addressId)) {
                    return res.status(400).json({ success: false, error: 'Invalid address ID' });
                }
                // Only allow updating specific fields
                const { name, addressLine1, addressLine2, city, state, zipCode, country, phoneNumber } = req.body;
                const updateData = {
                    name,
                    addressLine1,
                    addressLine2,
                    city,
                    state,
                    zipCode,
                    country,
                    phoneNumber
                };
                const updatedAddress = yield AddressService_1.AddressService.updateAddress(userId, addressId, updateData);
                res.status(200).json({
                    success: true,
                    data: updatedAddress
                });
            }
            catch (error) {
                logger_1.default.error('Error updating address:', error);
                res.status(400).json({ success: false, error: error.message || 'Failed to update address' });
            }
        });
    }
    static deleteAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.authUser);
                const addressId = parseInt(req.params.id);
                if (!userId) {
                    return res.status(401).json({ error: 'Unauthorized' });
                }
                if (isNaN(addressId)) {
                    return res.status(400).json({ error: 'Invalid address ID' });
                }
                yield AddressService_1.AddressService.deleteAddress(userId, addressId);
                res.status(204).send();
            }
            catch (error) {
                logger_1.default.error('Error deleting address:', error);
                res.status(400).json({ success: false, error: error.message || 'Failed to delete address' });
            }
        });
    }
    static getOrderAddresses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = parseInt(req.authUser);
                const orderId = parseInt(req.params.orderId);
                if (!userId) {
                    return res.status(401).json({ success: false, error: 'Unauthorized' });
                }
                if (isNaN(orderId)) {
                    return res.status(400).json({ success: false, error: 'Invalid order ID' });
                }
                const addresses = yield AddressService_1.AddressService.getOrderAddresses(userId, orderId);
                res.status(200).json({
                    success: true,
                    data: addresses
                });
            }
            catch (error) {
                logger_1.default.error('Error fetching order addresses:', error);
                res.status(400).json({ success: false, error: error.message || 'Failed to fetch order addresses' });
            }
        });
    }
}
exports.AddressController = AddressController;
