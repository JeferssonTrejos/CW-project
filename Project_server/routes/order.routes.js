import express from "express";
import orderController from "../controllers/order.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

import { orderValidations } from "../validations/order.validations.js";
import { validationResult } from "express-validator";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);
router.post(
  "/",
  orderValidations,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  orderController.createOrder
);

router.get("/", orderController.getOrders);

// Nuevos endpoints
router.get("/:id", orderController.getOrderById);
router.get(
  "/all/orders",
  roleMiddleware(["admin"]),
  orderController.getAllOrders
);
router.get(
  "/:id/status",
  roleMiddleware(["admin"]),
  orderController.updateOrderStatus
);

export default router;
