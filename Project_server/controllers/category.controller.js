import Category from "../models/category.model.js";

// Obtener todas las categorías
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las categorías activas
const getAvailableCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una categoría por ID
const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear una nueva categoría
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar una categoría por ID
const updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminación lógica (soft delete) de una categoría por ID
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res
      .status(200)
      .json({ message: "Categoría eliminada lógicamente con éxito" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminación permanente (hard delete) de una categoría por ID
const hardDeleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }
    res.status(200).json({ message: "Categoría eliminada permanentemente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllCategories,
  getAvailableCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  hardDeleteCategory,
};
