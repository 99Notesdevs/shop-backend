import { ProductRepository } from "../repositories/ProductRepository";
import logger from "../utils/logger";

export type ProductType = 'softCopy' | 'hardCopy';
export class ProductService {
    // Create a new product
    static async createProduct(data: { name: string; description: string; price: number; stock: number; imageUrl?: string; salePrice: number; categoryId: number, validity?: number, type: ProductType }) {
        logger.info("Entering createProduct service", { name: data.name, categoryId: data.categoryId });

        const category = await ProductRepository.findCategoryById(data.categoryId);
        if (!category) {
            logger.warn("Category not found", { categoryId: data.categoryId });
            throw new Error("Category not found");
        }

        const newProduct = await ProductRepository.createProduct(data);

        logger.info("Exiting createProduct service", { productId: newProduct.id });
        return newProduct;
    }

    // Get a product by ID
    static async getProductById(id: number) {
        logger.info("Entering getProductById service", { productId: id });

        const product = await ProductRepository.findProductById(id);
        if (!product) {
            logger.warn("Product not found", { productId: id });
            throw new Error("Product not found");
        }

        logger.info("Exiting getProductById service", { productId: product.id });
        return product;
    }

    // Get all products
    static async getAllProducts() {
        logger.info("Entering getAllProducts service");

        const products = await ProductRepository.findAllProducts();

        logger.info("Exiting getAllProducts service");
        return products;
    }

    // Update a product by ID
    static async updateProduct(id: number, data: { name?: string; description?: string; price?: number; stock?: number; imageUrl?: string; salePrice: number; categoryId?: number, validity?: number, type: ProductType }) {
        logger.info("Entering updateProduct service", { productId: id, data });

        const product = await ProductRepository.findProductById(id);
        if (!product) {
            logger.warn("Product not found", { productId: id });
            throw new Error("Product not found");
        }

        if (data.categoryId) {
            const category = await ProductRepository.findCategoryById(data.categoryId);
            if (!category) {
                logger.warn("Category not found", { categoryId: data.categoryId });
                throw new Error("Category not found");
            }
        }

        const updatedProduct = await ProductRepository.updateProduct(id, data);

        logger.info("Exiting updateProduct service", { productId: updatedProduct.id });
        return updatedProduct;
    }

    // Delete a product by ID
    static async deleteProduct(id: number) {
        logger.info("Entering deleteProduct service", { productId: id });

        const product = await ProductRepository.findProductById(id);
        if (!product) {
            logger.warn("Product not found", { productId: id });
            throw new Error("Product not found");
        }

        await ProductRepository.deleteProduct(id);

        logger.info("Exiting deleteProduct service", { productId: id });
    }
}