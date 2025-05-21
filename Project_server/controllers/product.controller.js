import Product from "../models/product.model.js";

export const listProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo la lista de productos" });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    const newProduct = new Product({
      name,
      description,
      price,
      category,
      image,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: "Error creando el producto" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, image } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { name, description, price, category, image },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Error actualizando el producto" });
  }
};

// Marcar producto como agotado/no disponible/descontinuado
export const markProductAsUnavailable = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: "Error actualizando el producto" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ message: "Error eliminando el producto" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo el producto" });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await Product.find({ category: categoryId });
    if (!products.length) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo los productos" });
  }
};

export default {
  listProducts,
  createProduct,
  updateProduct,
  markProductAsUnavailable,
  deleteProduct,
  getProductById,
  getProductsByCategory,
};
