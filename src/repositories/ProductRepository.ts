import { prisma } from "../config/prisma";
import logger from "../utils/logger";

// Define the ProductType as a union of the possible values
type ProductType = 'softCopy' | 'hardCopy';

export class ProductRepository {
    // Create a new product
    static async createProduct(data: { 
        name: string; 
        description: string; 
        price: number; 
        stock: number; 
        imageUrl?: string; 
        salePrice: number; 
        categoryId: number; 
        validity?: number; 
        type: ProductType 
    }) {
        logger.info("Entering createProduct repository method", { name: data.name, categoryId: data.categoryId });

        const newProduct = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                stock: data.stock,
                imageUrl: data.imageUrl,
                salePrice: data.salePrice,
                validity: data.validity,
                type: data.type,
                category: {
                    connect: { id: data.categoryId },
                },
            },
        });

        logger.info("Exiting createProduct repository method", { productId: newProduct.id });
        return newProduct;
    }

    // Find a product by ID
    static async findProductById(id: number) {
        logger.info("Entering findProductById repository method", { productId: id });

        const product = await prisma.product.findUnique({
            where: { id },
        });

        if (!product) {
            logger.warn("Product not found in repository", { productId: id });
        }

        logger.info("Exiting findProductById repository method", { productId: id });
        return product;
    }

    // Get all products
    static async findAllProducts() {
        logger.info("Entering findAllProducts repository method");

        const products = await prisma.product.findMany({
            orderBy: { createdAt: "desc" },
        });

        logger.info("Exiting findAllProducts repository method");
        return products;
    }

    // Update a product by ID
    static async updateProduct(
        id: number, 
        data: { 
            name?: string; 
            description?: string; 
            price?: number; 
            stock?: number; 
            imageUrl?: string; 
            salePrice?: number; 
            categoryId?: number; 
            validity?: number; 
            type: ProductType;
        }
    ) {
        logger.info("Entering updateProduct repository method", { productId: id, data });

        const updatedProduct = await prisma.product.update({
            where: { id },
            data
        });

        logger.info("Exiting updateProduct repository method", { productId: updatedProduct.id });
        return updatedProduct;
    }

    // Delete a product by ID
    static async deleteProduct(id: number) {
        logger.info("Entering deleteProduct repository method", { productId: id });

        await prisma.product.delete({
            where: { id },
        });

        logger.info("Exiting deleteProduct repository method", { productId: id });
    }

    // Find a category by ID
    static async findCategoryById(categoryId: number) {
        logger.info("Entering findCategoryById repository method", { categoryId });

        const category = await prisma.category.findUnique({
            where: { id: categoryId },
        });

        if (!category) {
            logger.warn("Category not found in repository", { categoryId });
        }

        logger.info("Exiting findCategoryById repository method", { categoryId });
        return category;
    }
}