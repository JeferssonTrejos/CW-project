import mongoose from "mongoose";

const orderUserSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

const orderDeliverySchema = new mongoose.Schema({
  /*
    1 = "Recoger en tienda"
    2 = "Envío a domicilio"
  */

  deliveryMethod: {
    type: Number,
    default: 1,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  postalCode: {
    type: String,
    default: "",
  },
  deliveryInstructions: {
    type: String,
    default: "",
  },
});

const orderItemSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const orderSchema = new mongoose.Schema({
  user: { type: orderUserSchema, required: true },
  deliveryDetails: { type: orderDeliverySchema, required: true },
  items: { type: [orderItemSchema], required: true },

  /* 
    1 = "pendiente"
    2 = "En proceso"
    3 = "Enviado"
    4 = "Entregado"
    5 = "Cancelado"
  */
  status: {
    type: Number,
    default: 1,
  },

  /* 
    1 = "Pagar al recoger/recibir"
    2 = "Transferencia bancaria"  
  */
  paymentMethod: {
    type: Number,
    default: 1,
    required: true,
  },
  additionalInstructions: {
    type: String,
    default: "",
  },
});

export default mongoose.model("Order", orderSchema);
