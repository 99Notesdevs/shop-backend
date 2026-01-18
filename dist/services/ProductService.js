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
exports.ProductService = void 0;
const ProductRepository_1 = require("../repositories/ProductRepository");
const logger_1 = __importDefault(require("../utils/logger"));
class ProductService {
    // Create a new product
    static createProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering createProduct service", { name: data.name, categoryId: data.categoryId });
            const category = yield ProductRepository_1.ProductRepository.findCategoryById(data.categoryId);
            if (!category) {
                logger_1.default.warn("Category not found", { categoryId: data.categoryId });
                throw new Error("Category not found");
            }
            const newProduct = yield ProductRepository_1.ProductRepository.createProduct(data);
            logger_1.default.info("Exiting createProduct service", { productId: newProduct.id });
            return newProduct;
        });
    }
    // Get a list of products by category ID with pagination
    static getProductsByCategory(categoryId_1) {
        return __awaiter(this, arguments, void 0, function* (categoryId, skip = 0, take = 10) {
            logger_1.default.info("Entering getProductsByCategory service", { categoryId, skip, take });
            const products = yield ProductRepository_1.ProductRepository.findProductsByCategory(categoryId, skip, take);
            logger_1.default.info("Exiting getProductsByCategory service", { categoryId, skip, take });
            return products;
        });
    }
    // Get a product by ID
    static getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getProductById service", { productId: id });
            const product = yield ProductRepository_1.ProductRepository.findProductById(id);
            if (!product) {
                logger_1.default.warn("Product not found", { productId: id });
                throw new Error("Product not found");
            }
            logger_1.default.info("Exiting getProductById service", { productId: product.id });
            return product;
        });
    }
    // Get all products
    static getAllProducts(skip, take) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getAllProducts service");
            const products = yield ProductRepository_1.ProductRepository.findAllProducts(skip, take);
            logger_1.default.info("Exiting getAllProducts service");
            return products;
        });
    }
    // Update a product by ID
    static updateProduct(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateProduct service", { productId: id, data });
            const product = yield ProductRepository_1.ProductRepository.findProductById(id);
            if (!product) {
                logger_1.default.warn("Product not found", { productId: id });
                throw new Error("Product not found");
            }
            if (data.categoryId) {
                const category = yield ProductRepository_1.ProductRepository.findCategoryById(data.categoryId);
                if (!category) {
                    logger_1.default.warn("Category not found", { categoryId: data.categoryId });
                    throw new Error("Category not found");
                }
            }
            const updatedProduct = yield ProductRepository_1.ProductRepository.updateProduct(id, data);
            logger_1.default.info("Exiting updateProduct service", { productId: updatedProduct.id });
            return updatedProduct;
        });
    }
    // Delete a product by ID
    static deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering deleteProduct service", { productId: id });
            const product = yield ProductRepository_1.ProductRepository.findProductById(id);
            if (!product) {
                logger_1.default.warn("Product not found", { productId: id });
                throw new Error("Product not found");
            }
            yield ProductRepository_1.ProductRepository.deleteProduct(id);
            logger_1.default.info("Exiting deleteProduct service", { productId: id });
        });
    }
}
exports.ProductService = ProductService;
