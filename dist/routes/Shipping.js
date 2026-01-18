"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateMiddleware_1 = require("../middlewares/authenticateMiddleware");
const authorizeRoles_1 = require("../middlewares/authorizeRoles");
const shipping_1 = require("../controllers/shipping");
const shippingRouter = (0, express_1.Router)();
// Route to get shipping details by ID
shippingRouter.get('/:orderId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["Admin", "User"]), shipping_1.ShippingController.trackShipping);
// Route to add shipping details
shippingRouter.post('/:orderId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["Admin", "User"]), shipping_1.ShippingController.addShippingDetails);
// Route to update shipping details
shippingRouter.put('/:orderId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["Admin"]), shipping_1.ShippingController.updateShippingDetails);
// Route to update status of shipping
shippingRouter.put('/status/:orderId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["Admin"]), shipping_1.ShippingController.updateShippingStatus);
// Route to delete shipping details
shippingRouter.delete('/:orderId', authenticateMiddleware_1.authenticate, (0, authorizeRoles_1.authorizeRoles)(["Admin"]), shipping_1.ShippingController.deleteShippingDetails);
exports.default = shippingRouter;
