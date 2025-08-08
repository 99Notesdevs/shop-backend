import { Router } from "express";
import categoryRouter from "./Category";  
import orderRouter from "./Orders";
import productRouter from "./Product";
import paymentsRouter from "./Payments";
import cartRouter from "./Cart";
import wishlistRouter from "./WIshlist";
import shippingRouter from "./Shipping";
import addressRouter from "./Address";
import productRatingRouter from "./productRating";
import emailRouter from "./email";
import couponRouter from "./Coupon";
const router = Router();

// health check api
router.get("/healthCheck", async (req, res) => {
    res.status(200).json({
      message: "vansh is a ceo",
    });
});
router.use("/category", categoryRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/payment", paymentsRouter);
router.use("/cart", cartRouter);
router.use("/wishlist", wishlistRouter);
router.use("/shipping", shippingRouter);
router.use("/address", addressRouter);
router.use("/productRating", productRatingRouter);
router.use("/email", emailRouter);
router.use("/coupon", couponRouter);
export default router;