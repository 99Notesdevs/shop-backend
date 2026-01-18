"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_1 = require("../controllers/product");
const productRouter = (0, express_1.Router)();
// Route to get all products?skip&take
productRouter.get('/', product_1.ProductController.getAllProducts);
// Route to get products by category id with skip and take 
productRouter.get('/category/:id', product_1.ProductController.getProductsByCategory);
// Route to get a product by ID
productRouter.get('/:id', product_1.ProductController.getProductById);
// Route to create a new product
productRouter.post('/', product_1.ProductController.createProduct);
// Route to update a product by ID
productRouter.put('/:id', product_1.ProductController.updateProduct);
// Route to delete a product by ID
productRouter.delete('/:id', product_1.ProductController.deleteProduct);
exports.default = productRouter;
