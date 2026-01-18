"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_1 = require("../controllers/category");
const categoryRouter = (0, express_1.Router)();
// Route to get all categories
categoryRouter.get('/', category_1.CategoryController.getCategories);
// Route to get a category by ID
categoryRouter.get('/:id', category_1.CategoryController.getCategoryById);
// Route to create a new category
categoryRouter.post('/', category_1.CategoryController.createCategory);
// Route to update a category by ID
categoryRouter.put('/:id', category_1.CategoryController.updateCategory);
// Route to delete a category by ID
categoryRouter.delete('/:id', category_1.CategoryController.deleteCategory);
exports.default = categoryRouter;
