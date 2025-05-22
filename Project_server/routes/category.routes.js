import express from "express";
import categoryController from "../controllers/category.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = express.Router();

// Obtener todas las categorías
router.get("/", categoryController.getAllCategories);

// Obtener una categoría por ID
router.get("/:id", categoryController.getCategoryById);

// Crear una nueva categoría
router.post(
  "/",
  authMiddleware,
  roleMiddleware(["admin"]),
  categoryController.createCategory
);

// Actualizar una categoría por ID
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  categoryController.updateCategory
);

// Eliminación lógica de una categoría por ID
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  categoryController.deleteCategory
);

// Eliminación física de una categoría por ID
router.delete(
  "/hard/:id",
  authMiddleware,
  roleMiddleware(["admin"]),
  categoryController.hardDeleteCategory
);

export default router;
