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
exports.ShippingController = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const ShippingService_1 = require("../services/ShippingService");
class ShippingController {
    static addShippingDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = req.params.orderId;
                const shippingAddress = req.body.shippingAddress;
                const trackingNumber = req.body.trackingNumber;
                const carrier = req.body.carrier;
                const status = req.body.status;
                const shippingDate = req.body.shippingDate;
                if (!orderId || !shippingAddress || !trackingNumber || !carrier || !status || !shippingDate) {
                    logger_1.default.error('Missing required fields');
                    res.status(400).json({ success: false, message: 'Missing required fields' });
                }
                const data = {
                    orderId: parseInt(orderId),
                    shippingAddress: shippingAddress,
                    trackingNumber: trackingNumber,
                    carrier: carrier,
                    status: status,
                    shippingDate: shippingDate,
                };
                logger_1.default.info(`Fetching category with ID: ${orderId}`);
                const shippingDetails = yield ShippingService_1.ShippingService.addShippingDetails(data);
                if (!shippingDetails) {
                    logger_1.default.error(`Shipping details with ID ${orderId} not found`);
                    res.status(404).json({ success: false, message: 'Shipping details not found' });
                }
                logger_1.default.info('Shipping details fetched successfully');
                res.status(200).json({ success: true, data: shippingDetails });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error fetching category: ${error.message}`);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error fetching category');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
    static updateShippingStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = parseInt(req.params.orderId);
                const status = req.body.status;
                if (!orderId || !status) {
                    logger_1.default.error('Missing required fields');
                    res.status(400).json({ success: false, message: 'Missing required fields' });
                }
                const data = {
                    orderId: orderId,
                    status: status
                };
                logger_1.default.info(`Updating shipping status with ID: ${orderId}`);
                const shippingDetails = yield ShippingService_1.ShippingService.updateShippingStatus(data);
                if (!shippingDetails) {
                    logger_1.default.error(`Shipping details with ID ${orderId} not found`);
                    res.status(404).json({ success: false, message: 'Shipping status not found' });
                }
                logger_1.default.info('Shipping details fetched successfully');
                res.status(200).json({ success: true, data: shippingDetails });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error updating shipping status: ${error.message}`);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error updating shipping status');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
    static updateShippingDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = req.params.orderId;
                const shippingAddress = req.body.shippingAddress;
                const trackingNumber = req.body.trackingNumber;
                const carrier = req.body.carrier;
                const status = req.body.status;
                const shippingDate = req.body.shippingDate;
                if (!orderId || !shippingAddress || !trackingNumber || !carrier || !status || !shippingDate) {
                    logger_1.default.error('Missing required fields');
                    res.status(400).json({ success: false, message: 'Missing required fields' });
                }
                const data = {
                    orderId: orderId,
                    shippingAddress: shippingAddress,
                    trackingNumber: trackingNumber,
                    carrier: carrier,
                    status: status,
                    shippingDate: shippingDate,
                };
                logger_1.default.info(`Updating shipping details with ID: ${orderId}`);
                const shippingDetails = yield ShippingService_1.ShippingService.updateShippingDetails(data);
                if (!shippingDetails) {
                    logger_1.default.error(`Shipping details with ID ${orderId} not found`);
                    res.status(404).json({ success: false, message: 'Shipping details not found' });
                }
                logger_1.default.info('Shipping details fetched successfully');
                res.status(200).json({ success: true, data: shippingDetails });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error updating shipping details: ${error.message}`);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error updating shipping details');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
    static trackShipping(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = req.params.orderId;
                logger_1.default.info(`Tracking shipping with ID: ${orderId}`);
                const shippingDetails = yield ShippingService_1.ShippingService.trackShipping(parseInt(orderId));
                logger_1.default.info('Shipping details fetched successfully');
                res.status(201).json({ success: true, data: shippingDetails });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error tracking shipping: ${error.message}`);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error tracking shipping');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
    static deleteShippingDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = req.params.orderId;
                logger_1.default.info(`Deleting shipping details with ID: ${orderId}`);
                const shippingDetails = yield ShippingService_1.ShippingService.deleteShippingDetails(parseInt(orderId));
                if (!shippingDetails) {
                    logger_1.default.error(`Shipping details with ID ${orderId} not found`);
                    res.status(404).json({ success: false, message: 'Shipping details not found' });
                }
                logger_1.default.info('Shipping details fetched successfully');
                res.status(200).json({ success: true, data: shippingDetails });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error deleting shipping details: ${error.message}`);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error deleting shipping details');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
}
exports.ShippingController = ShippingController;
