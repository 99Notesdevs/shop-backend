import { Router } from 'express';
import { ProductRatingController } from '../controllers/productRating';
import { authenticate } from '../middlewares/authenticateMiddleware';
import { authorizeRoles } from '../middlewares/authorizeRoles';
const productRatingRouter = Router();

// Route to get all product ratings
productRatingRouter.get('/global/:productId', ProductRatingController.getGlobalProductRating);

productRatingRouter.get('/user/:productId/:userId', ProductRatingController.getProductRatingsByUserIdForProduct);
// Route to create a new product rating
productRatingRouter.post('/:productId',authenticate,authorizeRoles(["User"]), ProductRatingController.createProductRating);

// Route to update a product rating by ID
productRatingRouter.put('/:productId',authenticate,authorizeRoles(["User"]), ProductRatingController.updateProductRating);

// Route to delete a product rating by ID
productRatingRouter.delete('/:productId',authenticate,authorizeRoles(["User"]), ProductRatingController.deleteProductRating);

export default productRatingRouter;