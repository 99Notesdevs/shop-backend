import { Router } from 'express';
import { WishlistController } from '../controllers/wishlist';
import { authenticate } from '../middlewares/authenticateMiddleware';
import { authorizeRoles } from '../middlewares/authorizeRoles';

const wishlistRouter = Router();

// Route to get all categories
wishlistRouter.get('/:userId',authenticate,authorizeRoles(["User"]), WishlistController.getWishlist);

// Route to add item to wishlist
wishlistRouter.post('/:productId/:userId',authenticate,authorizeRoles(["User"]), WishlistController.addItemToWishlist);

// Route to remove item from wishlist
wishlistRouter.delete('/:productId/:userId',authenticate,authorizeRoles(["User"]), WishlistController.removeItemFromWishlist);

export default wishlistRouter;