import { Router } from 'express';
import { ShippingController } from '../controllers/shipping';

const shippingRouter = Router();

// Route to get all categories
shippingRouter.get('/', ShippingController.getAllShippingOptions);

// Route to get a category by ID
shippingRouter.get('/:id', ShippingController.addShippingDetails);

// Route to create a new category
shippingRouter.post('/', ShippingController.trackShipping);


export default shippingRouter;