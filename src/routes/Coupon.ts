import { Router } from "express";
import { authenticate } from "../middlewares/authenticateMiddleware";
import { authorizeRoles } from "../middlewares/authorizeRoles";
import { CouponController } from "../controllers/coupon";

const router = Router();

router.post("/",  CouponController.createCoupon);
router.get("/", CouponController.getAllCoupons);
router.get("/:code", CouponController.getCouponByType);
router.post('/use/:code',authenticate, authorizeRoles(["User"]), CouponController.useCoupon)
router.post('/remove/:code',authenticate, authorizeRoles(["User"]), CouponController.removeCoupon)
router.get("/:id", CouponController.getCouponById);
router.put("/:id", CouponController.updateCoupon);
router.delete("/:id", CouponController.deleteCoupon);

export default router;