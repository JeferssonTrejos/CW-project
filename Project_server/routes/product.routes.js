import express from "express";
import productController from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", productController.listProducts);

router.post("/create", productController.createProduct);

router.post("/update", productController.updateProduct);

router.post("/markunavailable", productController.markProductAsUnavailable);

router.post("/delete/:id", productController.deleteProduct);

router.get("/:id", productController.getProductById);

router.get("/category/:id", productController.getProductsByCategory);

export default router;
