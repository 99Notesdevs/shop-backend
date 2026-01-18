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
exports.WishlistController = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const WishlistService_1 = require("../services/WishlistService");
class WishlistController {
    static getWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Fetching wishlist');
                if (!req.authUser) {
                    logger_1.default.error('No user ID provided');
                    throw new Error('No user ID provided');
                }
                const userId = req.authUser;
                const wishlist = yield WishlistService_1.WishlistService.getWishlist(Number(userId));
                if (!wishlist) {
                    logger_1.default.error('No wishlist found');
                    throw new Error('No wishlist found');
                }
                logger_1.default.info('Wishlist fetched successfully');
                res.status(200).json({ success: true, data: wishlist });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error fetching wishlist: ${error.message}`);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error fetching wishlist');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
    static addItemToWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Creating new wishlist');
                if (!req.authUser) {
                    logger_1.default.error('No user ID provided');
                    throw new Error('No user ID provided');
                }
                const userId = req.authUser;
                if (!req.params.productId) {
                    logger_1.default.error('No product ID provided');
                    throw new Error('No product ID provided');
                }
                console.log("here", req.params.productId);
                const productId = req.params.productId;
                const newWishlist = yield WishlistService_1.WishlistService.addItemToWishlist(Number(userId), Number(productId));
                logger_1.default.info('Wishlist created successfully');
                res.status(201).json({ success: true, data: newWishlist });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error creating wishlist: ${error.message}`);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error creating wishlist');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
    static removeItemFromWishlist(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info(`Deleting wishlist with ID: ${req.params.productId}`);
                if (!req.authUser) {
                    logger_1.default.error('No user ID provided');
                    throw new Error('No user ID provided');
                }
                const userId = req.authUser;
                if (!req.params.productId) {
                    logger_1.default.error('No product ID provided');
                    throw new Error('No product ID provided');
                }
                const productId = req.params.productId;
                const deletedWishlist = yield WishlistService_1.WishlistService.removeItemFromWishlist(Number(userId), Number(productId));
                if (!deletedWishlist) {
                    logger_1.default.error(`Wishlist with ID ${productId} not found`);
                    res.status(404).json({ success: false, message: 'Wishlist not found' });
                }
                logger_1.default.info('Wishlist deleted successfully');
                res.status(200).json({ success: true, data: deletedWishlist });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error deleting wishlist: ${error.message}`);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error deleting wishlist');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
}
exports.WishlistController = WishlistController;
