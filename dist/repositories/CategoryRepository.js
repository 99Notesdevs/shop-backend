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
exports.CategoryRepository = void 0;
const prisma_1 = require("../config/prisma");
const logger_1 = __importDefault(require("../utils/logger"));
class CategoryRepository {
    static getCategories() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Fetching all categories');
            const categories = yield prisma_1.prisma.category.findMany();
            if (!categories) {
                logger_1.default.error('No categories found');
                throw new Error('No categories found');
            }
            logger_1.default.info('Categories fetched successfully');
            return categories;
        });
    }
    static getCategoryById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Fetching category with ID: ${id}`);
            const category = yield prisma_1.prisma.category.findUnique({
                where: {
                    id: id
                }
            });
            if (!category) {
                logger_1.default.error(`Category with ID ${id} not found`);
                throw new Error('Category not found');
            }
            logger_1.default.info('Category fetched successfully');
            return category;
        });
    }
    static createCategory(categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info('Creating new category');
            const newCategory = yield prisma_1.prisma.category.create({
                data: {
                    name: categoryData.name,
                    description: categoryData.description,
                }
            });
            if (!newCategory) {
                logger_1.default.error('Error creating category');
                throw new Error('Error creating category');
            }
            logger_1.default.info('Category created successfully');
            return newCategory;
        });
    }
    static updateCategory(id, categoryData) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Updating category with ID: ${id}`);
            const updatedCategory = yield prisma_1.prisma.category.update({
                where: {
                    id: id
                },
                data: {
                    name: categoryData.name,
                    description: categoryData.description,
                }
            });
            if (!updatedCategory) {
                logger_1.default.error(`Error updating category with ID ${id}`);
                throw new Error('Error updating category');
            }
            logger_1.default.info('Category updated successfully');
            return updatedCategory;
        });
    }
    static deleteCategory(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info(`Deleting category with ID: ${id}`);
            const deletedCategory = yield prisma_1.prisma.category.delete({
                where: {
                    id: id
                }
            });
            if (!deletedCategory) {
                logger_1.default.error(`Error deleting category with ID ${id}`);
                throw new Error('Error deleting category');
            }
            logger_1.default.info('Category deleted successfully');
            return deletedCategory;
        });
    }
}
exports.CategoryRepository = CategoryRepository;
