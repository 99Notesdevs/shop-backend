"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryService = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const InventoryRepository_1 = require("../repositories/InventoryRepository");
class InventoryService {
    static getAllInventories() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Fetching all inventories service");
            const inventories = yield InventoryRepository_1.InventoryRepository.getAllInventories();
            return inventories;
        });
    }
    static getInventoryByProductId(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching inventory for product ID: ${productId} service`);
            const inventory = yield InventoryRepository_1.InventoryRepository.getInventoryByProductId(productId);
            if (!inventory) {
                logger_1.default.info("Inventory not found");
                throw new Error("Inventory not found");
            }
            return inventory;
        });
    }
    static updateInventory(productId, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Updating inventory for product ID: ${productId} service`);
            const updatedInventory = yield InventoryRepository_1.InventoryRepository.updateInventory(productId, quantity);
            if (!updatedInventory) {
                logger_1.default.info("Inventory not found");
                throw new Error("Inventory not found");
            }
            return updatedInventory;
        });
    }
}
exports.InventoryService = InventoryService;
