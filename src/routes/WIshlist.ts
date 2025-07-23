import { Router } from 'express';
import { WishlistController } from '../controllers/wishlist';
import { authenticate } from '../middlewares/authenticateMiddleware';

const wishlistRouter = Router();

// Route to get all categories
wishlistRouter.get('/:userId', WishlistController.getWishlist);

// Route to add item to wishlist
wishlistRouter.post('/:productId/:userId', WishlistController.addItemToWishlist);

// Route to remove item from wishlist
wishlistRouter.delete('/:productId/:userId', WishlistController.removeItemFromWishlist);

export default wishlistRouter;