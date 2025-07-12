import { prisma } from "../config/prisma"
import logger from "../utils/logger"

export class CategoryRepository {
    static async getCategories() {
        logger.info('Fetching all categories');
        const categories = await prisma.category.findMany();
        if (!categories) {
            logger.error('No categories found');
            throw new Error('No categories found');
        }
        logger.info('Categories fetched successfully');
        return categories;
    }

    static async getCategoryById(id: number) {
        logger.info(`Fetching category with ID: ${id}`);
        const category = await prisma.category.findUnique({
            where: {
                id: id
            }
        });
        if (!category) {
            logger.error(`Category with ID ${id} not found`);
            throw new Error('Category not found');
        }
        logger.info('Category fetched successfully');
        return category;
    }

    static async createCategory(categoryData: any) {
        logger.info('Creating new category');
        const newCategory = await prisma.category.create({
            data: {
                name: categoryData.name,
                description: categoryData.description,
            }
        });
        if (!newCategory) {
            logger.error('Error creating category');
            throw new Error('Error creating category');
        }
        logger.info('Category created successfully');
        return newCategory;
    }

    static async updateCategory(id: number, categoryData: any) {
        logger.info(`Updating category with ID: ${id}`);
        const updatedCategory = await prisma.category.update({
            where: {
                id: id
            },
            data: {
                name: categoryData.name,
                description: categoryData.description,
            }
        });
        if (!updatedCategory) {
            logger.error(`Error updating category with ID ${id}`);
            throw new Error('Error updating category');
        }
        logger.info('Category updated successfully');
        return updatedCategory;
    }
    
    static async deleteCategory(id: number) {
        logger.info(`Deleting category with ID: ${id}`);
        const deletedCategory = await prisma.category.delete({
            where: {
                id: id
            }
        });
        if (!deletedCategory) {
            logger.error(`Error deleting category with ID ${id}`);
            throw new Error('Error deleting category');
        }
        logger.info('Category deleted successfully');
        return deletedCategory;
    } 
}