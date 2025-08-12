import { ProductRepository } from "../repositories/ProductRepository";
import logger from "../utils/logger";

export class SearchService {
    static async search(query: string) {
        logger.info("Entering search service method", { query });

        // const pages = await PageRepository.search(query);
        // const blogs = await BlogsRepository.search(query);
        // const currentArticles = await CurrentArticleRepository.search(query);
        const products = await ProductRepository.search(query);
        const result = {
            ...products
        }

        logger.info("Exiting search service method");
        return result;
    }
}