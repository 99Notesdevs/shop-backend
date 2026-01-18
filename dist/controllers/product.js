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
exports.ProductController = void 0;
const ProductService_1 = require("../services/ProductService");
const logger_1 = __importDefault(require("../utils/logger"));
class ProductController {
    // Create a new product
    static createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, price, stock, imageUrl, metadata, categoryId, validity, salePrice, type } = req.body;
                if (!name || !description || !price || !stock || !categoryId || !type) {
                    throw new Error("All required fields (name, description, price, stock, categoryId, type) must be provided");
                }
                const newProduct = yield ProductService_1.ProductService.createProduct({
                    name,
                    description,
                    price: parseFloat(price),
                    stock: parseInt(stock),
                    imageUrl,
                    metadata,
                    categoryId: parseInt(categoryId),
                    validity: validity ? parseInt(validity) : undefined,
                    salePrice: parseFloat(salePrice),
                    type,
                });
                logger_1.default.info("Product created successfully", { productId: newProduct.id });
                res.status(201).json({ success: true, data: newProduct });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in createProduct controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in createProduct controller");
                    res.status(500).json({ success: false, message: "Something went wrong in createProduct" });
                }
            }
        });
    }
    // Get products by category ID with pagination
    static getProductsByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { skip, take } = req.query;
                const products = yield ProductService_1.ProductService.getProductsByCategory(parseInt(id), Number(skip), Number(take));
                if (!products) {
                    logger_1.default.warn("No products found for the given category", { categoryId: id });
                }
                else {
                    logger_1.default.info("Products retrieved successfully", { categoryId: id });
                }
                res.status(200).json({ success: true, data: products });
            }
            catch (error) {
                logger_1.default.error("Unknown error in getProductsByCategory controller");
                res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Something went wrong in getProductsByCategory" });
            }
        });
    }
    // Get a product by ID
    static getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    throw new Error("Product ID is required");
                }
                const product = yield ProductService_1.ProductService.getProductById(parseInt(id));
                if (!product) {
                    throw new Error("Product not found");
                }
                logger_1.default.info("Product retrieved successfully", { productId: product.id });
                res.status(200).json({ success: true, data: product });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in getProductById controller", error.message);
                    res.status(404).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in getProductById controller");
                    res.status(500).json({ success: false, message: "Something went wrong in getProductById" });
                }
            }
        });
    }
    // Get all products
    static getAllProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { skip, take } = req.query;
                const products = yield ProductService_1.ProductService.getAllProducts(Number(skip), Number(take));
                logger_1.default.info("Products retrieved successfully");
                res.status(200).json({ success: true, data: products });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in getAllProducts controller", error.message);
                    res.status(500).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in getAllProducts controller");
                    res.status(500).json({ success: false, message: "Something went wrong in getAllProducts" });
                }
            }
        });
    }
    // Update a product by ID
    static updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { name, description, price, stock, imageUrl, metadata, categoryId, validity, salePrice, type } = req.body;
                if (!id) {
                    throw new Error("Product ID is required");
                }
                const updatedProduct = yield ProductService_1.ProductService.updateProduct(parseInt(id), {
                    name,
                    description,
                    price: price ? parseFloat(price) : undefined,
                    stock: stock ? parseInt(stock) : undefined,
                    imageUrl,
                    metadata,
                    categoryId: categoryId ? parseInt(categoryId) : undefined,
                    validity: validity ? parseInt(validity) : undefined,
                    salePrice: parseFloat(salePrice),
                    type,
                });
                logger_1.default.info("Product updated successfully", { productId: updatedProduct.id });
                res.status(200).json({ success: true, data: updatedProduct });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in updateProduct controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in updateProduct controller");
                    res.status(500).json({ success: false, message: "Something went wrong in updateProduct" });
                }
            }
        });
    }
    // Delete a product by ID
    static deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                if (!id) {
                    throw new Error("Product ID is required");
                }
                yield ProductService_1.ProductService.deleteProduct(parseInt(id));
                logger_1.default.info("Product deleted successfully", { productId: id });
                res.status(200).json({ success: true, message: "Product deleted successfully" });
            }
            catch (error) {
                if (error instanceof Error) {
                    logger_1.default.error("Error in deleteProduct controller", error.message);
                    res.status(400).json({ success: false, message: error.message });
                }
                else {
                    logger_1.default.error("Unknown error in deleteProduct controller");
                    res.status(500).json({ success: false, message: "Something went wrong in deleteProduct" });
                }
            }
        });
    }
}
exports.ProductController = ProductController;
