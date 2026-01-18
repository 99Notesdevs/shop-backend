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
exports.ProductRepository = void 0;
const prisma_1 = require("../config/prisma");
const logger_1 = __importDefault(require("../utils/logger"));
class ProductRepository {
    // Create a new product
    static createProduct(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering createProduct repository method", { name: data.name, categoryId: data.categoryId });
            const newProduct = yield prisma_1.prisma.product.create({
                data: {
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    stock: data.stock,
                    imageUrl: data.imageUrl,
                    metadata: data.metadata,
                    salePrice: data.salePrice,
                    validity: data.validity,
                    type: data.type,
                    category: {
                        connect: { id: data.categoryId },
                    },
                },
            });
            logger_1.default.info("Exiting createProduct repository method", { productId: newProduct.id });
            return newProduct;
        });
    }
    // Find products by category ID with pagination
    static findProductsByCategory(categoryId, skip, take) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering findProductsByCategory repository method", { categoryId, skip, take });
            const products = yield prisma_1.prisma.product.findMany({
                where: { categoryId },
                skip,
                take,
            });
            logger_1.default.info("Exiting findProductsByCategory repository method", { categoryId, skip, take });
            return products;
        });
    }
    // Find a product by ID
    static findProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering findProductById repository method", { productId: id });
            const product = yield prisma_1.prisma.product.findUnique({
                where: { id },
            });
            if (!product) {
                logger_1.default.warn("Product not found in repository", { productId: id });
            }
            logger_1.default.info("Exiting findProductById repository method", { productId: id });
            return product;
        });
    }
    // Get all products
    static findAllProducts(skip, take) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering findAllProducts repository method");
            const products = yield prisma_1.prisma.product.findMany({
                orderBy: { createdAt: "desc" },
                skip,
                take,
            });
            logger_1.default.info("Exiting findAllProducts repository method");
            return products;
        });
    }
    // Update a product by ID
    static updateProduct(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateProduct repository method", { productId: id, data });
            const updatedProduct = yield prisma_1.prisma.product.update({
                where: { id },
                data
            });
            logger_1.default.info("Exiting updateProduct repository method", { productId: updatedProduct.id });
            return updatedProduct;
        });
    }
    static updateProductStock(id, stock) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateProduct repository method", { productId: id, stock });
            const updatedProduct = yield prisma_1.prisma.product.update({
                where: { id },
                data: {
                    stock: { decrement: stock }
                }
            });
            logger_1.default.info("Exiting updateProduct repository method", { productId: updatedProduct.id });
            return updatedProduct;
        });
    }
    // Delete a product by ID
    static deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering deleteProduct repository method", { productId: id });
            yield prisma_1.prisma.product.delete({
                where: { id },
            });
            logger_1.default.info("Exiting deleteProduct repository method", { productId: id });
        });
    }
    // Find a category by ID
    static findCategoryById(categoryId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering findCategoryById repository method", { categoryId });
            const category = yield prisma_1.prisma.category.findUnique({
                where: { id: categoryId },
            });
            if (!category) {
                logger_1.default.warn("Category not found in repository", { categoryId });
            }
            logger_1.default.info("Exiting findCategoryById repository method", { categoryId });
            return category;
        });
    }
    static search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering search repository method", { query });
            const products = yield prisma_1.prisma.product.findMany({
                where: {
                    OR: [
                        { name: { contains: query, mode: "insensitive" } },
                        { description: { contains: query, mode: "insensitive" } },
                        { category: { name: { contains: query, mode: "insensitive" } } }
                    ]
                }
            });
            logger_1.default.info("Exiting search repository method");
            return products;
        });
    }
}
exports.ProductRepository = ProductRepository;
