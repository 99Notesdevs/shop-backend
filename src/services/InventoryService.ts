import logger from "../utils/logger";
import { InventoryRepository } from "../repositories/InventoryRepository";

export class InventoryService {
    static async getAllInventories() {
        logger.info("Fetching all inventories service");
        const inventories = await InventoryRepository.getAllInventories();
        return inventories;
    }

    static async getInventoryByProductId(productId: number) {
        logger.info(`Fetching inventory for product ID: ${productId} service`);
        const inventory = await InventoryRepository.getInventoryByProductId(productId);
        if (!inventory) {
            logger.info("Inventory not found");
            throw new Error("Inventory not found");
        }
        return inventory;
    }

    static async updateInventory(productId: number, quantity: number) {
        logger.info(`Updating inventory for product ID: ${productId} service`);
        const updatedInventory = await InventoryRepository.updateInventory(productId, quantity);
        if (!updatedInventory) {
            logger.info("Inventory not found");
            throw new Error("Inventory not found");
        }
        return updatedInventory;
    }
}