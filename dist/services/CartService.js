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
exports.CartService = void 0;
const CartRepository_1 = require("../repositories/CartRepository");
const logger_1 = __importDefault(require("../utils/logger"));
class CartService {
    static getCartByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Fetching all categories');
            const cart = yield CartRepository_1.CartRepository.getCartByUserId(userId);
            if (!cart) {
                logger_1.default.error('No cart found');
                throw new Error('No cart found');
            }
            logger_1.default.info('Cart fetched successfully');
            return cart;
        });
    }
    static addItemToCart(cartId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Adding item to cart: ${cartId}`);
            const cartItem = yield CartRepository_1.CartRepository.addItemToCart(cartId, productId, quantity);
            if (!cartItem) {
                logger_1.default.error(`Item with ID ${cartId} not found`);
                throw new Error('Item not found');
            }
            logger_1.default.info('Item added to cart successfully');
            return cartItem;
        });
    }
    static updateCartItem(cartItemId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Updating cart item');
            const updatedCartItem = yield CartRepository_1.CartRepository.updateCartItem(cartItemId, quantity);
            if (!updatedCartItem) {
                logger_1.default.error('Error updating cart item');
                throw new Error('Error updating cart item');
            }
            logger_1.default.info('Cart item updated successfully');
            return updatedCartItem;
        });
    }
    static removeCartItem(cartId, cartItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Deleting cart item with ID: ${cartItemId}`);
            const updatedCategory = yield CartRepository_1.CartRepository.removeCartItem(cartId, cartItemId);
            if (!updatedCategory) {
                logger_1.default.error(`Error deleting cart item with ID ${cartItemId}`);
                throw new Error('Error deleting cart item');
            }
            logger_1.default.info('Cart item deleted successfully');
            return updatedCategory;
        });
    }
    static clearCart(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Deleting cart with ID: ${cartId}`);
            const deletedCart = yield CartRepository_1.CartRepository.clearCart(cartId);
            if (!deletedCart) {
                logger_1.default.error(`Error deleting cart with ID ${cartId}`);
                throw new Error('Error deleting cart');
            }
            logger_1.default.info('Cart deleted successfully');
            return deletedCart;
        });
    }
}
exports.CartService = CartService;
