import { Router } from 'express';
import { CartController } from '../controllers/cart';
import { authenticate } from '../middlewares/authenticateMiddleware';
import { authorizeRoles } from '../middlewares/authorizeRoles';
const cartRouter = Router();

// Route to get cart by user ID
cartRouter.get('/user/:userId', CartController.getCartByUserId);

// Route to add item to cart ?productId & quantity
cartRouter.post('/:cartId', CartController.addItemToCart);

// Route to update item in cart ?productId & quantity
cartRouter.put('/:cartItemId', CartController.updateCartItem);

// Route to remove item from cart
cartRouter.delete('/:cartId/:cartItemId', CartController.removeCartItem);

// Route to clear cart
cartRouter.delete('/:cartId', CartController.clearCart);

export default cartRouter;