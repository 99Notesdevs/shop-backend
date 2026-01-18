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
exports.CartController = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const CartService_1 = require("../services/CartService");
class CartController {
    static getCartByUserId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get user ID from the request body (set by auth middleware)
                console.log("reached in controller", req.body);
                const userId = req.params.userId;
                if (!userId) {
                    logger_1.default.error('No user ID found in request');
                    return res.status(401).json({
                        success: false,
                        message: 'Authentication required'
                    });
                }
                logger_1.default.info(`Fetching cart for user ${userId}`);
                const cart = yield CartService_1.CartService.getCartByUserId(parseInt(userId));
                if (!cart) {
                    logger_1.default.info('No cart found for user');
                    return res.status(200).json({
                        success: true,
                        data: { items: [] }
                    });
                }
                logger_1.default.info('Cart fetched successfully');
                res.status(200).json({
                    success: true,
                    data: cart
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error fetching cart: ${error.message}`);
                    res.status(500).json({
                        success: false,
                        message: error.message
                    });
                }
                else {
                    logger_1.default.error('Unknown error fetching cart');
                    res.status(500).json({
                        success: false,
                        message: 'Internal server error'
                    });
                }
            }
        });
    }
    static addItemToCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartId = req.params.cartId;
                const { productId, quantity } = req.query; // Get from query params
                if (!productId || !quantity) {
                    return res.status(400).json({
                        success: false,
                        message: 'productId and quantity are required as query parameters'
                    });
                }
                logger_1.default.info(`Adding item to cart: ${cartId}, product: ${productId}, quantity: ${quantity}`);
                const cartItem = yield CartService_1.CartService.addItemToCart(parseInt(cartId), parseInt(productId), parseInt(quantity));
                if (!cartItem) {
                    logger_1.default.error(`Item not found`);
                    res.status(404).json({ success: false, message: 'Item not found' });
                }
                logger_1.default.info('Item added to cart successfully');
                res.status(200).json({ success: true, data: cartItem });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error adding item to cart: ${error.message}`);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error adding item to cart');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
    static updateCartItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get user ID from the request body (set by auth middleware)
                const userId = parseInt(req.authUser);
                if (!userId) {
                    logger_1.default.error('No user ID found in request');
                    return res.status(401).json({
                        success: false,
                        message: 'Authentication required'
                    });
                }
                const cartItemId = req.params.cartItemId;
                const quantity = req.query.quantity;
                if (!quantity) {
                    return res.status(400).json({
                        success: false,
                        message: 'quantity is required as query parameter'
                    });
                }
                logger_1.default.info('Updating cart item');
                const updatedCartItem = yield CartService_1.CartService.updateCartItem(parseInt(cartItemId), parseInt(quantity));
                logger_1.default.info('Cart item updated successfully');
                res.status(201).json({ success: true, data: updatedCartItem });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error updating cart item: ${error.message}`);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error updating cart item');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
    static removeCartItem(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get user ID from the request body (set by auth middleware)
                const userId = parseInt(req.authUser);
                if (!userId) {
                    logger_1.default.error('No user ID found in request');
                    return res.status(401).json({
                        success: false,
                        message: 'Authentication required'
                    });
                }
                const cartId = req.params.cartId;
                const cartItemId = req.params.cartItemId;
                logger_1.default.info(`Deleting cart item with ID: ${cartItemId}`);
                const updateCategory = yield CartService_1.CartService.removeCartItem(parseInt(cartId), parseInt(cartItemId));
                if (!updateCategory) {
                    logger_1.default.error(`Cart item with ID ${cartItemId} not found`);
                    res.status(404).json({ success: false, message: 'Cart item not found' });
                }
                logger_1.default.info('Cart item deleted successfully');
                res.status(200).json({ success: true, data: updateCategory });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error deleting cart item: ${error.message}`);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error deleting cart item');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
    static clearCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Get user ID from the request body (set by auth middleware)
                const userId = parseInt(req.authUser);
                if (!userId) {
                    logger_1.default.error('No user ID found in request');
                    return res.status(401).json({
                        success: false,
                        message: 'Authentication required'
                    });
                }
                const cartId = req.params.cartId;
                logger_1.default.info(`Deleting cart with ID: ${cartId}`);
                const deletedCart = yield CartService_1.CartService.clearCart(parseInt(cartId));
                if (!deletedCart) {
                    logger_1.default.error(`Cart with ID ${cartId} not found`);
                    res.status(404).json({ success: false, message: 'Cart not found' });
                }
                logger_1.default.info('Cart deleted successfully');
                res.status(200).json({ success: true, data: deletedCart });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error deleting cart: ${error.message}`);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error deleting cart');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
}
exports.CartController = CartController;
