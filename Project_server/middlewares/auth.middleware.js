// middlewares/auth.middleware.js
import jwt from "jsonwebtoken";

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Acceso no autorizado" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // id y name
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

export default authMiddleware;
