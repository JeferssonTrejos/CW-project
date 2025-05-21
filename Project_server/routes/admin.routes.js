// routes/user.routes.js
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import userController from "../controllers/user.controller.js"; // Nuevo controlador

const router = express.Router();

// Listar todos los usuarios
router.get("/", authMiddleware, userController.listUsers);

router.put("/:id/role", authMiddleware, userController.updateUserRole);

export default router;
