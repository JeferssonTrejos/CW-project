import Product from "../models/product.model.js";

//Obtiene TODO los productos en la base de datos
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.status(200).json(products);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error obteniendo la lista de TODOS productos" });
  }
};
// Obtiene todos los productos disponibles marcados como destacados
export const getAllProductsHighlighted = async (req, res) => {
  try {
    const products = await Product.find({
      isAvailable: true,
      isHighlighted: true,
    }).populate("category");
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo la lista de productos" });
  }
};

// Obtiene todos los productos disponibles
export const getAvailableProducts = async (req, res) => {
  try {
    const products = await Product.find({ isAvailable: true }).populate(
      "category"
    );
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
    console.error(err);
    res.status(500).json({ message: "Error creando el producto" });
  }
};

// Actualiza un producto existente
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, category, image, isHighlighted } =
      req.body;

    if (!id) {
      return res.status(400).json({ message: "ID del producto es requerido" });
    }

    // Busca el producto por ID
    const oldProduct = await Product.findById(id);
    if (!oldProduct) {
      return res.status(404).json({ message: "El producto no existe" });
    }

    // Usa los nuevos valores si se proporcionan, de lo contrario mantiene los antiguos
    const nName = name ? name : oldProduct.name;
    const nDescription = description ? description : oldProduct?.description;
    const nPrice = price ? price : oldProduct?.price;
    const nCategory = category ? category : oldProduct?.category;
    const nImage = image ? image : oldProduct?.image;
    const nIsHighlighted = isHighlighted
      ? isHighlighted
      : oldProduct?.isHighlighted;

    // Actualiza el producto en la base de datos
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: nName,
        description: nDescription,
        price: nPrice,
        category: nCategory,
        image: nImage,
        isHighlighted: nIsHighlighted,
      },
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
      { isAvailable: false },
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

    const product = await Product.findById(id).populate("category");
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

    const products = await Product.find({ category: categoryId }).populate(
      "category"
    );
    if (!products.length) {
      return res.status(404).json({ message: "No se encontraron productos" });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error obteniendo los productos" });
  }
};

export default {
  getAllProducts,
  getAllProductsHighlighted,
  getAvailableProducts,
  createProduct,
  updateProduct,
  markProductAsUnavailable,
  deleteProduct,
  getProductById,
  getProductsByCategory,
};
