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
exports.CategoryController = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const CategoryService_1 = require("../services/CategoryService");
class CategoryController {
    static getCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                logger_1.default.info('Fetching categories');
                const categories = yield CategoryService_1.CategoryService.getCategories();
                if (!categories) {
                    logger_1.default.error('No categories found');
                    throw new Error('No categories found');
                }
                logger_1.default.info('Categories fetched successfully');
                res.status(200).json({ success: true, data: categories });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error fetching categories: ${error.message}`);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error fetching categories');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
    static getCategoryById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.id;
                logger_1.default.info(`Fetching category with ID: ${categoryId}`);
                const category = yield CategoryService_1.CategoryService.getCategoryById(parseInt(categoryId));
                if (!category) {
                    logger_1.default.error(`Category with ID ${categoryId} not found`);
                    throw new Error('Category not found');
                }
                logger_1.default.info('Category fetched successfully');
                res.status(200).json({ success: true, data: category });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error fetching category: ${error.message}`);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error fetching category');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
    static createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryData = req.body;
                logger_1.default.info('Creating new category');
                const data = {
                    name: categoryData.name,
                    description: categoryData.description,
                };
                const newCategory = yield CategoryService_1.CategoryService.createCategory(data);
                logger_1.default.info('Category created successfully');
                res.status(201).json({ success: true, data: newCategory });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error creating category: ${error.message}`);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error creating category');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
    static updateCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.id;
                const data = req.body;
                logger_1.default.info(`Deleting category with ID: ${categoryId}`);
                const updateCategory = yield CategoryService_1.CategoryService.updateCategory(parseInt(categoryId), data);
                if (!updateCategory) {
                    logger_1.default.error(`Category with ID ${categoryId} not found`);
                    throw new Error('Category not found');
                }
                logger_1.default.info('Category deleted successfully');
                res.status(200).json({ success: true, data: updateCategory });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error deleting category: ${error.message}`);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error deleting category');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
    static deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryId = req.params.id;
                logger_1.default.info(`Deleting category with ID: ${categoryId}`);
                const deletedCategory = yield CategoryService_1.CategoryService.deleteCategory(parseInt(categoryId));
                if (!deletedCategory) {
                    logger_1.default.error(`Category with ID ${categoryId} not found`);
                    throw new Error('Category not found');
                }
                logger_1.default.info('Category deleted successfully');
                res.status(200).json({ success: true, data: deletedCategory });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error(`Error deleting category: ${error.message}`);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error('Unexpected error deleting category');
                    res.status(500).json({ success: false, message: 'Internal server error' });
                }
            }
        });
    }
}
exports.CategoryController = CategoryController;
