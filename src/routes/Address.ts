import { Router } from "express";
import { AddressController } from "../controllers/address";
import { authenticate } from "../middlewares/authenticateMiddleware";
import { authorizeRoles } from "../middlewares/authorizeRoles";

const router = Router();

// Create a new address
router.post('/', authenticate, authorizeRoles(["User"]), AddressController.createAddress);

// Get all addresses for the authenticated user
router.get('/', authenticate, authorizeRoles(["User"]), AddressController.getUserAddresses);

// Update an address
router.put('/:id', authenticate, authorizeRoles(["User"]), AddressController.updateAddress);

// Delete an address
router.delete('/:id', authenticate, authorizeRoles(["User"]), AddressController.deleteAddress);

// Get addresses for a specific order
router.get('/order/:orderId', authenticate, authorizeRoles(["User"]), AddressController.getOrderAddresses);

export default router;