import express from "express";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

// Login
router.post("/login", authController.login);

// Registro
router.post("/register", authController.register);

// Ruta protegida
router.get("/profile", authMiddleware, authController.getProfile);

// Logout
router.post("/logout", authMiddleware, authController.logout);

export default router;
