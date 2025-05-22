import express from "express";
import productController from "../controllers/product.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

// obtener todos los productos en la base de datos
router.get("/all", productController.getAllProducts);

// obtener todos los productos disponibles
router.get("/", productController.getAvailableProducts);

// obtener producto por id
router.get("/:id", productController.getProductById);

// crear nuevo producto
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  productController.createProduct
);

// actualizar producto
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  productController.updateProduct
);

// marcar producto como no disponible
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  productController.markProductAsUnavailable
);

// eliminar producto
router.delete(
  "/hard/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  productController.deleteProduct
);

// obtener productos por categoría
router.get("/category/:id", productController.getProductsByCategory);

export default router;
