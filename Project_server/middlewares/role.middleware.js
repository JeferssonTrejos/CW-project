export const roleMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user?.role)) {
      return res.status(403).json({
        message: "Acceso denegado: permisos insuficientes",
      });
    }
    next();
  };
};

// // Middleware para permisos específicos
// export const checkPermission = (requiredPermission) => {
//   return (req, res, next) => {
//     if (!req.user.permissions.includes(requiredPermission)) {
//       return res.status(403).json({
//         message: `Permiso requerido: ${requiredPermission}`,
//       });
//     }
//     next();
//   };
// };
