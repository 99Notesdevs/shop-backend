import { Router } from "express";
import categoryRouter from "./Category";  
import orderRouter from "./Orders";
const router = Router();

// health check api
router.get("/healthCheck", async (req, res) => {
    res.status(200).json({
      message: "vansh is asshole",
    });
});
router.use("/category", categoryRouter);
router.use("/order", orderRouter);
export default router;