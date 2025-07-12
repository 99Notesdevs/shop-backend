import { CategoryRepository } from '../repositories/CategoryRepository';
import logger from '../utils/logger';

export class CategoryService {
    static async getCategories() {
        logger.info('Fetching all categories');
        const categories = await CategoryRepository.getCategories();
        if (!categories) {
            logger.error('No categories found');
            throw new Error('No categories found');
        }
        logger.info('Categories fetched successfully');
        return categories;
    }

    static async getCategoryById(id: number) {
        logger.info(`Fetching category with ID: ${id}`);
        const category = await CategoryRepository.getCategoryById(id);
        if (!category) {
            logger.error(`Category with ID ${id} not found`);
            throw new Error('Category not found');
        }
        logger.info('Category fetched successfully');
        return category;
    }

    static async createCategory(categoryData: any) {
        logger.info('Creating new category');
        const newCategory = await CategoryRepository.createCategory(categoryData);
        if (!newCategory) {
            logger.error('Error creating category');
            throw new Error('Error creating category');
        }
        logger.info('Category created successfully');
        return newCategory;
    }

    static async updateCategory(id: number, categoryData: any) {
        logger.info(`Updating category with ID: ${id}`);
        const updatedCategory = await CategoryRepository.updateCategory(id, categoryData);
        if (!updatedCategory) {
            logger.error(`Error updating category with ID ${id}`);
            throw new Error('Error updating category');
        }
        logger.info('Category updated successfully');
        return updatedCategory;
    }

    static async deleteCategory(id: number) {
        logger.info(`Deleting category with ID: ${id}`);
        const deletedCategory = await CategoryRepository.deleteCategory(id);
        if (!deletedCategory) {
            logger.error(`Error deleting category with ID ${id}`);
            throw new Error('Error deleting category');
        }
        logger.info('Category deleted successfully');
        return deletedCategory;
    }
}