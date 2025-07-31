import { Router } from "express";
import { PaymentsController } from "../controllers/payments";
import { authenticate } from "../middlewares/authenticateMiddleware";
import { authorizeRoles } from "../middlewares/authorizeRoles";

const paymentsRouter = Router();

paymentsRouter.post('/status', PaymentsController.checkPaymentStatus);
paymentsRouter.get("/:id", authenticate, authorizeRoles(["User"]), PaymentsController.getPaymentDetails);

paymentsRouter.post('/create-order', authenticate, authorizeRoles(["User"]), PaymentsController.initiatePayment);
paymentsRouter.post('/create-order-product', authenticate, authorizeRoles(["User"]), PaymentsController.initiatePaymentProduct);

// paymentsRouter.post('/callback', PaymentsController.handlePaymentCallback);
// paymentsRouter.put('/:id/status', authenticate, authorizeRoles(["User"]), PaymentsController.updatePaymentStatus);

export default paymentsRouter;