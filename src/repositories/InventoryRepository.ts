import logger from "../utils/logger";
import { prisma } from "../config/prisma";

export class InventoryRepository {
    static async getAllInventories() {
        logger.info("Fetching all inventories from repository");
        const inventories = await prisma.inventory.findMany();
        return inventories;
    }
    static async getInventoryByProductId(productId: number) {
        logger.info(`Fetching inventory for product ID: ${productId} from repository`);
        const inventory = await prisma.inventory.findUnique({
            where: {
                productId: productId,
            },
        });
        return inventory;
    }
    static async updateInventory(productId: number, quantity: number) {
        logger.info(`Updating inventory for product ID: ${productId} in repository`);
        const updatedInventory = await prisma.inventory.update({
            where: {
                productId: productId,
            },
            data: {
                quantity: quantity,
            },
        });
        return updatedInventory;
    }
}