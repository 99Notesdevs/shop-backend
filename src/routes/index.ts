import { Router } from "express";
import categoryRouter from "./Category";  
import orderRouter from "./Orders";
import productRouter from "./Product";
import paymentsRouter from "./Payments";
const router = Router();

// health check api
router.get("/healthCheck", async (req, res) => {
    res.status(200).json({
      message: "vansh is asshole",
    });
});
router.use("/category", categoryRouter);
router.use("/order", orderRouter);
router.use("/product", productRouter);
router.use("/payments", paymentsRouter);
export default router;