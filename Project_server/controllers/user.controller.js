// controllers/user.controller.js
import User from "../models/user.model.js";

export const listUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // Excluir contraseñas
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo usuarios" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { newRole } = req.body;
    
    const user = await User.findByIdAndUpdate(
      id,
      { role: newRole },
      { new: true }
    ).select("-password");

    res.json({ message: "Rol actualizado", user });
  } catch (err) {
    res.status(500).json({ message: "Error actualizando rol" });
  }
};


export default {
    listUsers,
    updateUserRole
};
