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
exports.InventoryController = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const InventoryService_1 = require("../services/InventoryService");
class InventoryController {
    static getAllInventories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Fetching all inventories');
                const inventories = yield InventoryService_1.InventoryService.getAllInventories();
                if (inventories.length === 0) {
                    logger_1.default.info('No inventories found');
                    throw new Error('No inventories found');
                }
                logger_1.default.info('Inventories fetched successfully');
                res.status(200).json({ success: true, data: inventories });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(error.message);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('An unknown error occurred');
                    res.status(500).json({ success: false, message: 'An unknown error occurred' });
                }
            }
        });
    }
    // {productId}
    static getInventoryByProductId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                logger_1.default.info(`Fetching inventory for product ID: ${productId}`);
                const inventory = yield InventoryService_1.InventoryService.getInventoryByProductId(parseInt(productId));
                if (!inventory) {
                    logger_1.default.info('Inventory not found');
                    throw new Error('Inventory not found');
                }
                logger_1.default.info('Inventory fetched successfully');
                res.status(200).json({ success: true, data: inventory });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(error.message);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('An unknown error occurred');
                    res.status(500).json({ success: false, message: 'An unknown error occurred' });
                }
            }
        });
    }
    // {productId}
    static updateInventory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { productId } = req.params;
                const { quantity } = req.body;
                logger_1.default.info(`Updating inventory for product ID: ${productId}`);
                const updatedInventory = yield InventoryService_1.InventoryService.updateInventory(parseInt(productId), parseInt(quantity));
                if (!updatedInventory) {
                    logger_1.default.info('Inventory not found');
                    throw new Error('Inventory not found');
                }
                logger_1.default.info('Inventory updated successfully');
                res.status(200).json({ success: true, data: updatedInventory });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(error.message);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('An unknown error occurred');
                    res.status(500).json({ success: false, message: 'An unknown error occurred' });
                }
            }
        });
    }
}
exports.InventoryController = InventoryController;
