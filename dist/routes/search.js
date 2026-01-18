"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const search_1 = require("../controllers/search");
const searchRouter = (0, express_1.Router)();
searchRouter.get('/global', search_1.SearchController.search);
exports.default = searchRouter;
