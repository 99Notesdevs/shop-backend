import { Router } from "express";

const router = Router();

// health check api
router.get("/healthCheck", async (req, res) => {
    res.status(200).json({
      message: "Working fine!",
    });
  });

export default router;