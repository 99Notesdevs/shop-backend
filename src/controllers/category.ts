import logger from '../utils/logger';
import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';

export class CategoryController {
    static async getCategories(req: Request, res: Response) {
        try {
            logger.info('Fetching categories');
            const categories = await CategoryService.getCategories();
            if (!categories) {
                logger.error('No categories found');
                throw new Error('No categories found');
            }
            logger.info('Categories fetched successfully');
            res.status(200).json({success: true, data: categories});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error fetching categories: ${error.message}`);
                res.status(404).json({success:false, message: error.message });
            }
            else {
                logger.error('Unexpected error fetching categories');
                res.status(500).json({success: false, message: 'Internal server error' });
            }
        }
    }

    static async getCategoryById(req: Request, res: Response) {
        try {
            const categoryId = req.params.id;
            logger.info(`Fetching category with ID: ${categoryId}`);
            const category = await CategoryService.getCategoryById(parseInt(categoryId));
            if (!category) {
                logger.error(`Category with ID ${categoryId} not found`);
                throw new Error('Category not found');
            }
            logger.info('Category fetched successfully');
            res.status(200).json({success: true, data: category});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error fetching category: ${error.message}`);
                res.status(404).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error fetching category');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async createCategory(req: Request, res: Response) {
        try {
            const categoryData = req.body;
            logger.info('Creating new category');
            const data = {
                name: categoryData.name,
                description: categoryData.description,
            }
            const newCategory = await CategoryService.createCategory(data);
            logger.info('Category created successfully');
            res.status(201).json({success: true, data: newCategory});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error creating category: ${error.message}`);
                res.status(400).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error creating category');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async updateCategory(req: Request, res: Response) {
        try {
            const categoryId = req.params.id;
            const data = req.body;
            logger.info(`Deleting category with ID: ${categoryId}`);
            const updateCategory = await CategoryService.updateCategory(parseInt(categoryId), data);
            if (!updateCategory) {
                logger.error(`Category with ID ${categoryId} not found`);
                throw new Error('Category not found');
            }
            logger.info('Category deleted successfully');
            res.status(200).json({success: true, data: updateCategory});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error deleting category: ${error.message}`);
                res.status(404).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error deleting category');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }

    static async deleteCategory(req: Request, res: Response) {
        try {
            const categoryId = req.params.id;
            logger.info(`Deleting category with ID: ${categoryId}`);
            const deletedCategory = await CategoryService.deleteCategory(parseInt(categoryId));
            if (!deletedCategory) {
                logger.error(`Category with ID ${categoryId} not found`);
                throw new Error('Category not found');
            }
            logger.info('Category deleted successfully');
            res.status(200).json({success: true, data: deletedCategory});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error(`Error deleting category: ${error.message}`);
                res.status(404).json({ success: false, message: error.message });
            }
            else {
                logger.error('Unexpected error deleting category');
                res.status(500).json({ success: false, message: 'Internal server error' });
            }
        }
    }
}