"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const wishlist_1 = require("../controllers/wishlist");
const authenticateMiddleware_1 = require("../middlewares/authenticateMiddleware");
const authorizeRoles_1 = require("../middlewares/authorizeRoles");
const wishlistRouter = (0, express_1.Router)();
// Route to get all categories
wishlistRouter.get('/:userId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), wishlist_1.WishlistController.getWishlist);
// Route to add item to wishlist
wishlistRouter.post('/:productId/:userId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), wishlist_1.WishlistController.addItemToWishlist);
// Route to remove item from wishlist
wishlistRouter.delete('/:productId/:userId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), wishlist_1.WishlistController.removeItemFromWishlist);
exports.default = wishlistRouter;
