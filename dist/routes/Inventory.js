"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventory_1 = require("../controllers/inventory");
const inventoryRouter = (0, express_1.Router)();
// Route to get all inventories
inventoryRouter.get('/', inventory_1.InventoryController.getAllInventories);
// Route to get an inventory by ID
inventoryRouter.get('/:id', inventory_1.InventoryController.getInventoryByProductId);
// Route to update an inventory by ID
inventoryRouter.put('/:id', inventory_1.InventoryController.updateInventory);
exports.default = inventoryRouter;
