"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cart_1 = require("../controllers/cart");
const authenticateMiddleware_1 = require("../middlewares/authenticateMiddleware");
const authorizeRoles_1 = require("../middlewares/authorizeRoles");
const cartRouter = (0, express_1.Router)();
// Route to get cart by user ID
cartRouter.get('/user/:userId', cart_1.CartController.getCartByUserId);
// Route to add item to cart ?productId & quantity
cartRouter.post('/:cartId', cart_1.CartController.addItemToCart);
// Route to update item in cart ?productId & quantity
cartRouter.put('/:cartItemId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), cart_1.CartController.updateCartItem);
// Route to remove item from cart
cartRouter.delete('/:cartId/:cartItemId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), cart_1.CartController.removeCartItem);
// Route to clear cart
cartRouter.delete('/:cartId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), cart_1.CartController.clearCart);
exports.default = cartRouter;
