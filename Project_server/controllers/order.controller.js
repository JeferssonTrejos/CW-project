import Order from "../models/order.model.js";
import ShoppingCart from "../models/shoppingCart.model.js";
import Product from "../models/product.model.js";

const statusText = (status) => {
  switch (status) {
    case 1:
      return "Pendiente";
    case 2:
      return "En proceso";
    case 3:
      return "Enviado";
    case 4:
      return "Entregado";
    case 5:
      return "Cancelado";
    default:
      return "Desconocido";
  }
};

const paymentMethodText = (method) => {
  switch (method) {
    case 1:
      return "Pagar al recoger/recibir";
    case 2:
      return "Transferencia bancaria";
    default:
      return "Desconocido";
  }
};

const deliveryMethodText = (method) => {
  switch (method) {
    case 1:
      return "Recoger en tienda";
    case 2:
      return "Entrega a domicilio";
    default:
      return "Desconocido";
  }
};

const createOrder = async (req, res) => {
  try {
    const shoppingCart = await ShoppingCart.findOne({ user: req.user.id })
      .populate({
        path: "items.product",
        select: "name price description category isAvailable",
        populate: { path: "category", select: "name" },
      })
      .populate("user", "name email");

    if (!shoppingCart || shoppingCart.items.length === 0) {
      return res.status(400).json({ error: "El carrito está vacío" });
    }

    //Validación
    const {
      deliveryMethod, // Debe ser 1 o 2
      address,
      city,
      phone,
      postalCode,
      deliveryInstructions,
      paymentMethod, // Debe ser 1 o 2
      additionalInstructions,
    } = req.body;

    // Mapear items del carrito
    const orderItems = shoppingCart.items.map((item) => ({
      productName: item.product.name,
      description: item.product.description,
      price: item.product.price,
      quantity: item.quantity,
    }));

    // Crear Pedido según nuevo esquema
    const order = new Order({
      user: {
        userId: req.user.id,
        name: shoppingCart.user.name,
        email: shoppingCart.user.email,
      },
      deliveryDetails: {
        deliveryMethod: Number(deliveryMethod),
        address: deliveryMethod === 2 ? address : "",
        city: deliveryMethod === 2 ? city : "",
        phone: deliveryMethod === 2 ? phone : "",
        postalCode: deliveryMethod === 2 ? postalCode : "",
        deliveryInstructions,
      },
      items: orderItems,
      paymentMethod: Number(paymentMethod),
      additionalInstructions,
    });

    // Limpiar solo los items del carrito,
    shoppingCart.items = [];
    await shoppingCart.save();

    // Guardar Pedido
    const savedOrder = await order.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la Pedido" });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "user.userId": req.user.id });
    res.json(
      { orders }
      //   orders.map((order) => ({
      //     id: order._id,
      //     status: statusText(order.status),
      //     total: Number(
      //       order.items
      //         .reduce((acc, item) => acc + item.price * item.quantity, 0)
      //         .toFixed(2)
      //     ),
      //   }))
    );
  } catch (error) {
    res.status(500).json({
      error: "Error al obtener órdenes",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

// Obtener una Pedido por ID (usuario propietario o admin)
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ error: "Pedido no encontrada" });
    }

    // Verificar si es admin o el dueño
    const isAdmin = req.user.role === "admin";
    const isOwner = order.user.userId.toString() === req.user.id;

    if (!isAdmin && !isOwner) {
      return res.status(403).json({ error: "Acceso no autorizado" });
    }

    // Formatear respuesta
    // res.json({ order })
    res.json({
      id: order._id,
      user: order.user,

      deliveryDetails: {
        address: order.deliveryDetails.address,
        city: order.deliveryDetails.city,
        phone: order.deliveryDetails.phone,
        postalCode: order.deliveryDetails.postalCode,
        deliveryInstructions: order.deliveryDetails.deliveryInstructions,
        deliveryMethodText: deliveryMethodText(
          order.deliveryDetails.deliveryMethod
        ),
      },
      items: order.items,

      status: statusText(order.status),
      statusCode: order.status,

      paymentMethod: paymentMethodText(order.paymentMethod),
      paymentMethodCode: order.paymentMethod,

      additionalInstructions: order.additionalInstructions,
      total: Number(
        order.items
          .reduce((acc, item) => acc + item.price * item.quantity, 0)
          .toFixed(2)
      ),
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la Pedido" });
  }
};

// Obtener todas las órdenes (solo admin)
const getAllOrders = async (req, res) => {
  console.log("getAllOrders called");
  try {
    const orders = await Order.find();

    res.json(orders);
    // res.json(
    //   orders.map((order) => ({
    //     id: order._id,
    //     user: order.user,
    //     status: statusText(order.status),
    //     total: Number(
    //       order.items
    //         .reduce((acc, item) => acc + item.price * item.quantity, 0)
    //         .toFixed(2)
    //     ),
    //     createdAt: order.createdAt,
    //   }))
    // );
  } catch (error) {
    res.status(500).json({ error: "Error al obtener órdenes" });
  }
};

// Actualizar estado de una Pedido (solo admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Validar que el estado sea un número entero positivo
    if (!Number.isInteger(status) || status <= 0) {
      return res.status(400).json({ error: "Estado inválido" });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Pedido no encontrada" });
    }

    res.json({
      id: order._id,
      message: "Estado actualizado correctamente",
      status: statusText(order.status),
    });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar estado" });
  }
};

// Añadir al export
export default {
  createOrder,
  getOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
