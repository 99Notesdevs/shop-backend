import { Router } from "express";
import { InventoryController } from "../controllers/inventory";

const inventoryRouter = Router();

// Route to get all inventories
inventoryRouter.get('/', InventoryController.getAllInventories);

// Route to get an inventory by ID
inventoryRouter.get('/:id', InventoryController.getInventoryByProductId);

// Route to update an inventory by ID
inventoryRouter.put('/:id', InventoryController.updateInventory);

export default inventoryRouter;