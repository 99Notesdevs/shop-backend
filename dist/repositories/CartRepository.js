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
exports.CartRepository = void 0;
const prisma_1 = require("../config/prisma");
const logger_1 = __importDefault(require("../utils/logger"));
class CartRepository {
    static getCartByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Fetching cart for user repository');
            const cart = yield prisma_1.prisma.cart.findUnique({
                where: { userId },
                include: { cartItems: true }
            });
            if (!cart) {
                logger_1.default.warn('Cart not found for user', userId);
                throw new Error('Cart not found');
            }
            return cart;
        });
    }
    static addItemToCart(cartId, productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Adding item to cart for user repository');
            console.log("cartId", cartId, "productId", productId, "quantity", quantity);
            const cart = yield prisma_1.prisma.cart.update({
                where: { id: cartId },
                data: {
                    cartItems: {
                        create: {
                            productId,
                            quantity
                        }
                    }
                }
            });
            if (!cart) {
                logger_1.default.warn('Failed to add item to cart', { cartId, productId });
                throw new Error('Failed to add item to cart');
            }
            return cart;
        });
    }
    static updateCartItem(cartItemId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Updating cart item for user repository');
            const cartItem = yield prisma_1.prisma.cartItem.update({
                where: { id: cartItemId },
                data: {
                    quantity
                }
            });
            if (!cartItem) {
                logger_1.default.warn('Failed to update cart item', { cartItemId });
                throw new Error('Failed to update cart item');
            }
            return cartItem;
        });
    }
    static removeCartItem(cartId, cartItemId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Removing item from cart for user repository');
            const cart = yield prisma_1.prisma.cart.update({
                where: { id: cartId },
                data: {
                    cartItems: {
                        delete: { id: cartItemId }
                    }
                }
            });
            if (!cart) {
                logger_1.default.warn('Failed to remove item from cart', { cartId, cartItemId });
                throw new Error('Failed to remove item from cart');
            }
            return cart;
        });
    }
    static clearCart(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Clearing cart for user repository');
            const cart = yield prisma_1.prisma.cart.update({
                where: { id: cartId },
                data: {
                    cartItems: {
                        deleteMany: {}
                    }
                }
            });
            if (!cart) {
                logger_1.default.warn('Failed to clear cart', { cartId });
                throw new Error('Failed to clear cart');
            }
            return cart;
        });
    }
}
exports.CartRepository = CartRepository;
