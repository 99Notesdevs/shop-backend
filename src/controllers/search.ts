import { Request, Response } from "express";
import { SearchService } from "../services/SearchService";
import logger from "../utils/logger";

export class SearchController {
    static async search(req: Request, res: Response) {
        try {
            const { query } = req.query;
            if (!query) {
                throw new Error("Query parameter is required");
            }

            if (typeof query !== "string") {
                throw new Error("Query parameter must be a string");
            }
            const result = await SearchService.search(query);
            res.status(200).json({success: true, data: result});
        } catch (error: unknown) {
            if(error instanceof Error) {
                logger.error("Error in search controller", error.message);
                res.status(400).json({ success: false, message: error.message });
            } else {
                logger.error("Error in search controller", "Unknown error");
                res.status(500).json({ success: false, message: "Internal server error" });
            }
        }
    }
}