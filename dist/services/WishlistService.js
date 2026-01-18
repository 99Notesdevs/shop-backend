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
exports.WishlistService = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const WishlistRepository_1 = require("../repositories/WishlistRepository");
class WishlistService {
    static getWishlist(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Fetching wishlist service');
            const wishlist = yield WishlistRepository_1.WishlistRepository.getWishlist(userId);
            if (!wishlist) {
                logger_1.default.warn(`Wishlist not found for user ID: ${userId}`);
                throw new Error('Wishlist not found');
            }
            return wishlist;
        });
    }
    static addItemToWishlist(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Adding item to wishlist service');
            const wishlist = yield WishlistRepository_1.WishlistRepository.addItemToWishlist(userId, productId);
            if (!wishlist) {
                logger_1.default.warn(`Failed to add item to wishlist for user ID: ${userId}`);
                throw new Error('Failed to add item to wishlist');
            }
            return wishlist;
        });
    }
    static removeItemFromWishlist(userId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Removing item from wishlist service');
            const wishlist = yield WishlistRepository_1.WishlistRepository.removeItemFromWishlist(userId, productId);
            if (!wishlist) {
                logger_1.default.warn(`Failed to remove item from wishlist for user ID: ${userId}`);
                throw new Error('Failed to remove item from wishlist');
            }
            return wishlist;
        });
    }
}
exports.WishlistService = WishlistService;
