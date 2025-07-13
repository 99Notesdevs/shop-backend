import { Router } from "express";
import categoryRouter from "./Category";
const router = Router();

// health check api
router.get("/healthCheck", async (req, res) => {
    res.status(200).json({
      message: "vansh is asshole",
    });
});
router.use("/category", categoryRouter);
export default router;