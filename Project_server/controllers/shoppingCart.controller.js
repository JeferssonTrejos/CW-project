import ShoppingCart from "../models/shoppingCart.model.js";
import Product from "../models/product.model.js";

// Obtener carrito activo del usuario
const getShoppingcart = async (req, res) => {
  try {
    let shoppingCart = await ShoppingCart.findOne({ user: req.user.id });

    // Si no hay carrito, crear uno nuevo
    if (!shoppingCart) {
      shoppingCart = new ShoppingCart({ user: req.user.id, items: [] }).save();
    }

    // Obtener carrito completo con productos
    const shoppingCartComplete = await ShoppingCart.findOne({
      user: req.user.id,
    })
      .populate({
        path: "items.product",
        select: "name price category isAvailable",
        populate: { path: "category", select: "name" },
      })
      .populate("user", "name email");

    res.status(200).json(shoppingCartComplete);
  } catch (error) {
    // console.log('error', error)
    res.status(500).json({ error: "Error al obtener el carrito" });
  }
};

// Agregar producto al carrito
const addToShoppingCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let shoppingCart = await ShoppingCart.findOne({ user: req.user.id });
    if (!shoppingCart) {
      shoppingCart = new ShoppingCart({ user: req.user.id, items: [] });
    }

    // Verificar disponibilidad del producto
    const product = await Product.findById(productId);
    if (!product || !product.isAvailable) {
      return res.status(400).json({ error: "Producto no esta disponible" });
    }

    // Verificar si el producto ya está en el carrito
    const existingItem = shoppingCart.items.find((item) =>
      item.product.equals(productId)
    );
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      shoppingCart.items.push({
        product: productId,
        quantity,
      });
    }

    await shoppingCart.save();
    res.status(200).json(shoppingCart);
  } catch (error) {
    res.status(500).json({ error: "Error al agregar al carrito" });
  }
};

// Actualizar cantidad de un producto según el id del PRODUCTO
const updateCartItem = async (req, res) => {
  try {
    const { id } = req.params; // id del producto
    const { quantity } = req.body;

    const shoppingCart = await ShoppingCart.findOne({ user: req.user.id });
    if (!shoppingCart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    // Buscar el item por el id del producto
    const item = shoppingCart.items.find(
      (item) => item.product.toString() === id
    );
    if (!item) {
      return res
        .status(404)
        .json({ error: "Producto no encontrado en el carrito" });
    }

    // Verificar disponibilidad
    const product = await Product.findById(item.product);
    if (!product || !product.isAvailable) {
      return res.status(400).json({ error: "Producto ya no está disponible" });
    }

    item.quantity = quantity;
    await shoppingCart.save();
    res.status(200).json(shoppingCart);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el carrito" });
  }
};

// Eliminar producto del carrito según el id del producto
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params; // id del producto

    const shoppingCart = await ShoppingCart.findOne({ user: req.user.id });
    if (!shoppingCart) {
      shoppingCart = new ShoppingCart({ user: req.user.id, items: [] }).save();
    }

    // Filtrar los items para eliminar el que tenga el product igual al id recibido
    shoppingCart.items = shoppingCart.items.filter(
      (item) => item.product.toString() !== id
    );

    await shoppingCart.save();
    res.json(shoppingCart);
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar del carrito" });
  }
};

// Eliminar todos los productos del carrito
const clearCart = async (req, res) => {
  try {
    const shoppingCart = await ShoppingCart.findOne({ user: req.user.id });
    if (!shoppingCart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    // Vaciar el carrito
    shoppingCart.items = [];
    await shoppingCart.save();

    res
      .status(200)
      .json({ message: "Carrito vaciado correctamente", cart: shoppingCart });
  } catch (error) {
    console.error("Error al vaciar el carrito:", error);
    res.status(500).json({ error: "Error al vaciar el carrito" });
  }
};

export default {
  getShoppingcart,
  addToShoppingCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
