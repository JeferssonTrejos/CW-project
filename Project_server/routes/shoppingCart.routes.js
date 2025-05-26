import express from "express";
import shoppingCartController from "../controllers/shoppingCart.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", shoppingCartController.getShoppingcart);
router.post("/add", shoppingCartController.addToShoppingCart);
router.put("/item/:id", shoppingCartController.updateCartItem);
router.delete("/item/:id", shoppingCartController.removeFromCart);

export default router;
