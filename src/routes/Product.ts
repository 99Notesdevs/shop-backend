import { Router } from 'express';
import { ProductController } from '../controllers/product';

const productRouter = Router();

// Route to get all products?skip&take
productRouter.get('/', ProductController.getAllProducts);

// Route to get products by category id with skip and take 
productRouter.get('/category/:id', ProductController.getProductsByCategory);

// Route to get a product by ID
productRouter.get('/:id', ProductController.getProductById);

// Route to create a new product
productRouter.post('/', ProductController.createProduct);

// Route to update a product by ID
productRouter.put('/:id', ProductController.updateProduct);

// Route to delete a product by ID
productRouter.delete('/:id', ProductController.deleteProduct);

export default productRouter;