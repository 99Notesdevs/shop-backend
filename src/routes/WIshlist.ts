import { Router } from 'express';
import { WishlistController } from '../controllers/wishlist';
import { authenticate } from '../middlewares/authenticateMiddleware';

const wishlistRouter = Router();

// Route to get all categories
wishlistRouter.get('/', authenticate , WishlistController.getWishlist);

// Route to add item to wishlist
wishlistRouter.post('/:productId', authenticate , WishlistController.addItemToWishlist);

// Route to remove item from wishlist
wishlistRouter.delete('/:productId', authenticate , WishlistController.removeItemFromWishlist);

export default wishlistRouter;