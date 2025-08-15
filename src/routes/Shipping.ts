import { Router } from 'express';
import { authenticate } from '../middlewares/authenticateMiddleware';
import { authorizeRoles } from '../middlewares/authorizeRoles';
import { ShippingController } from '../controllers/shipping';

const shippingRouter = Router();

// Route to get all categories
// shippingRouter.get('/', ShippingController.getAllShippingOptions);

// Route to get a category by ID
shippingRouter.get('/:id', authenticate, authorizeRoles(["Admin"]), ShippingController.addShippingDetails);

// Route to create a new category
shippingRouter.post('/', authenticate, authorizeRoles(["Admin"]), ShippingController.trackShipping);

// Route to update a category by ID
shippingRouter.put('/:id', authenticate, authorizeRoles(["Admin"]), ShippingController.updateShippingDetails);

// Route to delete a category by ID
shippingRouter.delete('/:id', authenticate, authorizeRoles(["Admin"]), ShippingController.deleteShippingDetails);
export default shippingRouter;