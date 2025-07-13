import Router from "express";
import { OrderController } from "../controllers/order";
import { authenticate } from "../middlewares/authenticateMiddleware";
import { authorizeRoles } from "../middlewares/authorizeRoles";

const orderRouter = Router();

orderRouter.get("/", OrderController.getAllOrders);
orderRouter.get("/:id", OrderController.getOrderById);
orderRouter.get('/track/:id', OrderController.trackOrder);

orderRouter.post("/", authenticate, authorizeRoles(["User"]), OrderController.createOrder);

orderRouter.put("/:id", OrderController.updateOrder);
orderRouter.put("/status/:id", OrderController.updateOrderStatus);

orderRouter.delete("/:id", OrderController.deleteOrder);

export default orderRouter;