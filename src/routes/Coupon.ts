import { Router } from "express";
import { CouponController } from "../controllers/coupon";

const router = Router();

router.post("/", CouponController.createCoupon);
router.get("/", CouponController.getAllCoupons);
router.get("/:id", CouponController.getCouponById);
router.put("/:id", CouponController.updateCoupon);
router.delete("/:id", CouponController.deleteCoupon);

export default router;