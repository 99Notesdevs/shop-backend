"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_1 = require("../controllers/address");
const authenticateMiddleware_1 = require("../middlewares/authenticateMiddleware");
const authorizeRoles_1 = require("../middlewares/authorizeRoles");
const router = (0, express_1.Router)();
// Create a new address
router.post('/', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), address_1.AddressController.createAddress);
// Get all addresses for the authenticated user
router.get('/', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), address_1.AddressController.getUserAddresses);
// Update an address
router.put('/:id', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), address_1.AddressController.updateAddress);
// Delete an address
router.delete('/:id', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), address_1.AddressController.deleteAddress);
// Get addresses for a specific order
router.get('/order/:orderId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["User"]), address_1.AddressController.getOrderAddresses);
exports.default = router;
