import { ProductRatingService } from "../services/ProductRatingService";    
import { Request, Response } from "express";
import logger from "../utils/logger";

export class ProductRatingController {
    static async getProductRatingsByUserIdForProduct(req: Request, res: Response) {
        try {
            const { productId } = req.params;
            const userId = req.authUser!;
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
    static async getProductReviews(req: Request, res: Response) {
        try {
            const { productId } = req.params;
            const productReviews = await ProductRatingService.getProductReviews(Number(productId));
            res.json({success:true,data:productReviews});
        } catch (error) {
            logger.error("Error in getProductReviews controller: ", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    static async getProductReviewByUserIdForProduct(req: Request, res: Response) {
        try {
            const { productId } = req.params;
            const userId = req.authUser!;
            const productReviews = await ProductRatingService.getProductReviewByUserIdForProduct(Number(userId), Number(productId));
            res.json({success:true,data:productReviews});
        } catch (error) {
            logger.error("Error in getProductReviewByUserIdForProduct controller: ", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    static async createProductRating(req: Request, res: Response) {
        try {
            const userId = req.authUser!;
            const { productId } = req.params;
            const { rating }  = req.body;
            const productRatings = await ProductRatingService.createProductRating(Number(productId), Number(userId), Number(rating));
            res.json({success:true,data:productRatings});
        } catch (error) {
            logger.error("Error in createProductRating controller: ", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    static async updateProductRating(req: Request, res: Response) {
        try {
            const userId = req.authUser!;
            const { productId } = req.params;
            const { rating }  = req.body;
            const productRatings = await ProductRatingService.updateProductRating(Number(productId), Number(userId), Number(rating));
            res.json({success:true,data:productRatings});
        } catch (error) {
            logger.error("Error in updateProductRating controller: ", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    static async updateProductReview(req: Request, res: Response) {
        try {
            const userId = req.authUser!;
            const { productId } = req.params;
            const { review }  = req.body;
            const productRatings = await ProductRatingService.updateProductReview(Number(productId), Number(userId), review);
            res.json({success:true,data:productRatings});
        } catch (error) {
            logger.error("Error in updateProductReview controller: ", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
    static async deleteProductRating(req: Request, res: Response) {
        try {
            const userId = req.authUser!;
            const { productId } = req.params;
            const productRatings = await ProductRatingService.deleteProductRating(Number(productId), Number(userId));
            res.json({success:true,data:productRatings});
        } catch (error) {
            logger.error("Error in deleteProductRating controller: ", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
}