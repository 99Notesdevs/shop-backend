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
exports.OfferController = void 0;
const OffersServices_1 = require("../services/OffersServices");
const logger_1 = __importDefault(require("../utils/logger"));
class OfferController {
    static createOffer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Creating offer');
                const offer = yield OffersServices_1.OffersService.createOffer(req.body);
                logger_1.default.info('Offer created successfully');
                res.status(201).json({ success: true, data: offer });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('An unknown error occurred');
                    res.status(500).json({ success: false, message: 'An unknown error occurred' });
                }
            }
        });
    }
    static getAllOffers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Fetching all offers');
                const offers = yield OffersServices_1.OffersService.getAllOffers();
                if (offers.length === 0) {
                    logger_1.default.info('No offers found');
                    throw new Error('No offers found');
                }
                logger_1.default.info('Offers fetched successfully');
                res.status(200).json({ success: true, data: offers });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(error.message);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('An unknown error occurred');
                    res.status(500).json({ success: false, message: 'An unknown error occurred' });
                }
            }
        });
    }
    static getOfferById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                logger_1.default.info(`Fetching offer for ID: ${id}`);
                const offer = yield OffersServices_1.OffersService.getOfferById(parseInt(id));
                if (!offer) {
                    logger_1.default.info('Offer not found');
                    throw new Error('Offer not found');
                }
                logger_1.default.info('Offer fetched successfully');
                res.status(200).json({ success: true, data: offer });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(error.message);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('An unknown error occurred');
                    res.status(500).json({ success: false, message: 'An unknown error occurred' });
                }
            }
        });
    }
    static updateOffer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, description, price } = req.body;
                logger_1.default.info(`Updating offer for ID: ${id}`);
                const offer = yield OffersServices_1.OffersService.updateOffer(parseInt(id), { name, description, price });
                if (!offer) {
                    logger_1.default.info('Offer not found');
                    throw new Error('Offer not found');
                }
                logger_1.default.info('Offer updated successfully');
                res.status(200).json({ success: true, data: offer });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(error.message);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('An unknown error occurred');
                    res.status(500).json({ success: false, message: 'An unknown error occurred' });
                }
            }
        });
    }
    static deleteOffer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                logger_1.default.info(`Deleting offer for ID: ${id}`);
                const offer = yield OffersServices_1.OffersService.deleteOffer(parseInt(id));
                if (!offer) {
                    logger_1.default.info('Offer not found');
                    throw new Error('Offer not found');
                }
                logger_1.default.info('Offer deleted successfully');
                res.status(200).json({ success: true, data: offer });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(error.message);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('An unknown error occurred');
                    res.status(500).json({ success: false, message: 'An unknown error occurred' });
                }
            }
        });
    }
}
exports.OfferController = OfferController;
