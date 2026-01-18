"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const ProductRepository_1 = require("../repositories/ProductRepository");
const logger_1 = __importDefault(require("../utils/logger"));
class SearchService {
    static search(query) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering search service method", { query });
            // const pages = await PageRepository.search(query);
            // const blogs = await BlogsRepository.search(query);
            // const currentArticles = await CurrentArticleRepository.search(query);
            const products = yield ProductRepository_1.ProductRepository.search(query);
            const result = Object.assign({}, products);
            logger_1.default.info("Exiting search service method");
            return result;
        });
    }
}
exports.SearchService = SearchService;
