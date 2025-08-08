import { ProductRatingService } from "../services/ProductRatingService";    
import { Request, Response } from "express";
import logger from "../utils/logger";

export class ProductRatingController {
    static async getProductRatingsByUserIdForProduct(req: Request, res: Response) {
        try {
            const { productId, userId } = req.params;
            const productRatings = await ProductRatingService.getProductRatingsByUserIdForProduct(Number(userId), Number(productId));
            res.json({success:true,data:productRatings});
        } catch (error) {
            logger.error("Error in getProductRatingsByUserIdForProduct controller: ", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    static async getGlobalProductRating(req: Request, res: Response) {
        try {
            const { productId } = req.params;
            const productRatings = await ProductRatingService.getGlobalProductRating(Number(productId));
            res.json({success:true,data:productRatings});
        } catch (error) {
            logger.error("Error in getGlobalProductRating controller: ", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    static async createProductRating(req: Request, res: Response) {
        try {
            console.log("req.body", req.body);
            const userId=req.body.authUser;
            const { productId } = req.params;
            const {rating} = req.body;
            console.log("userId", userId);
            console.log("productId", productId);
            console.log("rating", rating);
            const productRatings = await ProductRatingService.createProductRating(Number(productId), Number(userId), Number(rating));
            console.log("productRatings", productRatings);
            res.json({success:true,data:productRatings});
        } catch (error) {
            logger.error("Error in createProductRating controller: ", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    static async updateProductRating(req: Request, res: Response) {
        try {
            const userId=req.body.authUser;
            const { productId } = req.params;
            const productRating = req.body;
            const productRatings = await ProductRatingService.updateProductRating(Number(productId), Number(userId), productRating);
            res.json({success:true,data:productRatings});
        } catch (error) {
            logger.error("Error in updateProductRating controller: ", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    static async deleteProductRating(req: Request, res: Response) {
        try {
            const userId=req.body.authUser;
            const { productId } = req.params;
            const productRatings = await ProductRatingService.deleteProductRating(Number(productId), Number(userId));
            res.json({success:true,data:productRatings});
        } catch (error) {
            logger.error("Error in deleteProductRating controller: ", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}