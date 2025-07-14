import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";
import logger from "../utils/logger";

export class ProductController {
    // Create a new product
    static async createProduct(req: Request, res: Response) {
        try {
            const { name, description, price, stock, imageUrl, categoryId, validity } = req.body;

            if (!name || !description || !price || !stock || !categoryId) {
                throw new Error("All required fields (name, description, price, stock, categoryId) must be provided");
            }

            const newProduct = await ProductService.createProduct({
                name,
                description,
                price: parseFloat(price),
                stock: parseInt(stock),
                imageUrl,
                categoryId: parseInt(categoryId),
                validity: validity ? parseInt(validity) : undefined,
            });

            logger.info("Product created successfully", { productId: newProduct.id });
            res.status(201).json({ success: true, data: newProduct });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in createProduct controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in createProduct controller");
                res.status(500).json({ success: false, message: "Something went wrong in createProduct" });
            }
        }
    }

    // Get a product by ID
    static async getProductById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                throw new Error("Product ID is required");
            }

            const product = await ProductService.getProductById(parseInt(id));
            if (!product) {
                throw new Error("Product not found");
            }

            logger.info("Product retrieved successfully", { productId: product.id });
            res.status(200).json({ success: true, data: product });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in getProductById controller", error.message);
                res.status(404).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in getProductById controller");
                res.status(500).json({ success: false, message: "Something went wrong in getProductById" });
            }
        }
    }

    // Get all products
    static async getAllProducts(req: Request, res: Response) {
        try {
            const products = await ProductService.getAllProducts();

            logger.info("Products retrieved successfully");
            res.status(200).json({ success: true, data: products });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in getAllProducts controller", error.message);
                res.status(500).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in getAllProducts controller");
                res.status(500).json({ success: false, message: "Something went wrong in getAllProducts" });
            }
        }
    }

    // Update a product by ID
    static async updateProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, description, price, stock, imageUrl, categoryId } = req.body;

            if (!id) {
                throw new Error("Product ID is required");
            }

            const updatedProduct = await ProductService.updateProduct(parseInt(id), {
                name,
                description,
                price: price ? parseFloat(price) : undefined,
                stock: stock ? parseInt(stock) : undefined,
                imageUrl,
                categoryId: categoryId ? parseInt(categoryId) : undefined,
            });

            logger.info("Product updated successfully", { productId: updatedProduct.id });
            res.status(200).json({ success: true, data: updatedProduct });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in updateProduct controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in updateProduct controller");
                res.status(500).json({ success: false, message: "Something went wrong in updateProduct" });
            }
        }
    }

    // Delete a product by ID
    static async deleteProduct(req: Request, res: Response) {
        try {
            const { id } = req.params;

            if (!id) {
                throw new Error("Product ID is required");
            }

            await ProductService.deleteProduct(parseInt(id));

            logger.info("Product deleted successfully", { productId: id });
            res.status(200).json({ success: true, message: "Product deleted successfully" });
        } catch (error: unknown) {
            if (error instanceof Error) {
                logger.error("Error in deleteProduct controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Unknown error in deleteProduct controller");
                res.status(500).json({ success: false, message: "Something went wrong in deleteProduct" });
            }
        }
    }
}