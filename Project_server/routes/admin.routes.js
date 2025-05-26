// routes/user.routes.js
import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";
import userController from "../controllers/user.controller.js"; // Nuevo controlador

const router = express.Router();

router.use(authMiddleware); // Middleware de autenticación
router.use(roleMiddleware(["admin"])); // Middleware para verificar rol de administrador

// Listar todos los usuarios
router.get("/", userController.listUsers);

router.put("/:id/role", userController.updateUserRole);

export default router;
