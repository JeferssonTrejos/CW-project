// Lista de orígenes permitidos
const allowedOrigins = ["http://localhost:5173/*"];

export const corsOptions = {
  origin: (origin, callback) => {
    // Permitir peticiones sin origen (como Postman o curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`Origen bloqueado por CORS: ${origin}`);
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true, // Permitir cookies / headers de autenticación
  optionsSuccessStatus: 200, // Para compatibilidad con navegadores antiguos
};
