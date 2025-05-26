import { body, check, oneOf } from "express-validator";

export const orderValidations = [
  // Validar método de entrega (1: Recoger en tienda, 2: Envío a domicilio)
  check("deliveryMethod").isNumeric().withMessage("Método de entrega inválido"),

  // Validar datos condicionales para envío a domicilio (2)
  oneOf(
    [
      [
        body("deliveryMethod").equals("2"),
        check("address")
          .exists()
          .withMessage("La dirección es requerida para envíos"),
        check("city")
          .exists()
          .withMessage("La ciudad es requerida para envíos"),
        check("phone")
          .exists()
          .withMessage("El teléfono es requerido para envíos"),
        check("postalCode")
          .exists()
          .withMessage("El código postal es requerido para envíos"),
      ],
      [body("deliveryMethod").equals("1")],
    ],
    "Datos de envío incompletos"
  ),

  // Validar método de pago (1: Pagar al recoger, 2: Transferencia)
  check("paymentMethod").isNumeric().withMessage("Método de pago inválido"),

  // Sanitización de campos opcionales
  check("deliveryInstructions").optional().trim().escape(),

  check("additionalInstructions").optional().trim().escape(),
];
