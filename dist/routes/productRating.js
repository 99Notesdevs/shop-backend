"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productRating_1 = require("../controllers/productRating");
const authenticateMiddleware_1 = require("../middlewares/authenticateMiddleware");
const authorizeRoles_1 = require("../middlewares/authorizeRoles");
const productRatingRouter = (0, express_1.Router)();
// Route to get all product ratings
productRatingRouter.get('/global/:productId', productRating_1.ProductRatingController.getGlobalProductRating);
// Route to get product ratings by user id for product
productRatingRouter.get('/user/:productId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), productRating_1.ProductRatingController.getProductRatingsByUserIdForProduct);
// Route to get product reviews by product id
productRatingRouter.get('/reviews/:productId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), productRating_1.ProductRatingController.getProductReviews);
// Route to get product review by user id for product
productRatingRouter.get('/review/:productId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), productRating_1.ProductRatingController.getProductReviewByUserIdForProduct);
// Route to create a new product rating
productRatingRouter.post('/:productId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), productRating_1.ProductRatingController.createProductRating);
// Route to update a product rating by ID
productRatingRouter.put('/:productId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), productRating_1.ProductRatingController.updateProductRating);
// Route to update a product review by ID
productRatingRouter.put('/:productId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), productRating_1.ProductRatingController.updateProductReview);
// Route to delete a product rating by ID
productRatingRouter.delete('/:productId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), productRating_1.ProductRatingController.deleteProductRating);
exports.default = productRatingRouter;
