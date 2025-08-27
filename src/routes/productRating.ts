import { Router } from 'express';
import { ProductRatingController } from '../controllers/productRating';
import { authenticate } from '../middlewares/authenticateMiddleware';
import { authorizeRoles } from '../middlewares/authorizeRoles';
const productRatingRouter = Router();

// Route to get all product ratings
productRatingRouter.get('/global/:productId', ProductRatingController.getGlobalProductRating);

// Route to get product ratings by user id for product
productRatingRouter.get('/user/:productId', authenticate,authorizeRoles(["User"]), ProductRatingController.getProductRatingsByUserIdForProduct);

// Route to get product reviews by product id
productRatingRouter.get('/reviews/:productId', authenticate,authorizeRoles(["User"]), ProductRatingController.getProductReviews);

// Route to get product review by user id for product
productRatingRouter.get('/review/:productId', authenticate,authorizeRoles(["User"]), ProductRatingController.getProductReviewByUserIdForProduct);

// Route to create a new product rating
productRatingRouter.post('/:productId',authenticate,authorizeRoles(["User"]), ProductRatingController.createProductRating);

// Route to update a product rating by ID
productRatingRouter.put('/:productId',authenticate,authorizeRoles(["User"]), ProductRatingController.updateProductRating);

// Route to update a product review by ID
productRatingRouter.put('/:productId',authenticate,authorizeRoles(["User"]), ProductRatingController.updateProductReview);

// Route to delete a product rating by ID
productRatingRouter.delete('/:productId',authenticate,authorizeRoles(["User"]), ProductRatingController.deleteProductRating);

export default productRatingRouter;