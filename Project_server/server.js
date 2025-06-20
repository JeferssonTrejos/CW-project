// app.js
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import { connectDB } from "./database/connection.js";
import authRoutes from "./routes/auth.routes.js";
// import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import shoppingCartRoutes from "./routes/shoppingCart.routes.js";
import orderRoutes from "./routes/order.routes.js";


dotenv.config();

const app = express();

// Conectar a MongoDB
connectDB();

// Middlewares globales
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Rutas
app.use("/admins", adminRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/shoppingcart", shoppingCartRoutes);
app.use("/orders", orderRoutes);

// Prueba de ruta
app.get("/", (req, res) => {
  res.status(200).json({ message: "working" });
});

// Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}`);
});
