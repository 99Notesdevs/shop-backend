import { Router } from 'express';
import { CategoryController } from '../controllers/category';

const categoryRouter = Router();

// Route to get all categories
categoryRouter.get('/', CategoryController.getCategories);

// Route to get a category by ID
categoryRouter.get('/:id', CategoryController.getCategoryById);

// Route to create a new category
categoryRouter.post('/', CategoryController.createCategory);

// Route to update a category by ID
categoryRouter.put('/:id', CategoryController.updateCategory);

// Route to delete a category by ID
categoryRouter.delete('/:id', CategoryController.deleteCategory);

export default categoryRouter;