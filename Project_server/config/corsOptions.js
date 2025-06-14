// // Lista de orígenes permitidos
// const allowedOrigins = [
//   "https://panaderiaelrosariov2.netlify.app",
//   "http://panaderiaelrosariov2.netlify.app",
//   "http://localhost:5173",
// ];
// export const corsOptions = {
//   origin: (origin, callback) => {
//     // Permitir peticiones sin origen (como Postman o curl)
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.warn(`Origen bloqueado por CORS: ${origin}`);
//       callback(new Error("No permitido por CORS"));
//     }
//   },
//   credentials: true, // Permitir cookies / headers de autenticación
//   optionsSuccessStatus: 200, // Para compatibilidad con navegadores antiguos
// };
// Configuración de CORS para producción
const corsOptions = {
  origin: [
    "https://panaderiaelrosariov2.netlify.app", // Reemplaza con tu dominio de Netlify
    "http://localhost:3000", // Para desarrollo local
    "http://localhost:5173", // Para Vite dev server
  ],
  credentials: true, // MUY IMPORTANTE: permite cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Set-Cookie"],
};
