import { Router } from 'express';
import { authenticate } from '../middlewares/authenticateMiddleware';
import { authorizeRoles } from '../middlewares/authorizeRoles';
import { ShippingController } from '../controllers/shipping';

const shippingRouter = Router();

// Route to get shipping details by ID
shippingRouter.get('/:orderId', authenticate, authorizeRoles(["Admin"]), ShippingController.trackShipping);

// Route to add shipping details
shippingRouter.post('/:orderId', authenticate, authorizeRoles(["Admin"]), ShippingController.addShippingDetails);

// Route to update shipping details
shippingRouter.put('/:orderId', authenticate, authorizeRoles(["Admin"]), ShippingController.updateShippingDetails);

// Route to delete shipping details
shippingRouter.delete('/:orderId', authenticate, authorizeRoles(["Admin"]), ShippingController.deleteShippingDetails);
export default shippingRouter;