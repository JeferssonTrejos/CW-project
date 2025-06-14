import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  maxAge: 60 * 60 * 24000, // 1 hora en ms
};

// Metodo para registrar usuario
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // Verificar duplicados
    if (await User.findOne({ email })) {
      return res.status(403).json({ message: "El usuario ya existe" });
    }

    // Solo admins pueden crear usuarios con rol diferente a 'user'
    if (role && role !== "user" && req.user?.role !== "admin") {
      return res
        .status(403)
        .json({ message: "No autorizado para asignar roles" });
    }

    // Crear y guardar usuario
    const user = new User({ name, email, role, password });
    await user.save();

    // Firmar JWT
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // Enviar cookie
    res.cookie("token", token, cookieOptions);

    // Responder
    res.status(201).json({
      message: "Usuario registrado",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// Metodo para actualizar roles (solo admin)
const updateUserRole = async (req, res) => {
  try {
    const { userId, newRole } = req.body;

    if (req.user.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Requiere privilegios de administrador" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { role: newRole },
      { new: true }
    );

    res.json({ message: "Rol actualizado", user });
  } catch (err) {
    res.status(500).json({ message: "Error actualizando rol" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Usuario no registrado" });
    }
    if (!(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Contraseña invalida" });
    }

    // Firmar JWT
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    // Enviar cookie
    res.cookie("token", token, cookieOptions);
    res.status(200).json({
      message: "Autenticación exitosa",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
};

const getProfile = (req, res) => {
  // req.user viene de auth.middleware.js
  res.json({
    message: "Profile",
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
  });
};

const logout = (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.json({ message: "Sesión cerrada" });
};

export default {
  register,
  updateUserRole,
  login,
  getProfile,
  logout,
};
