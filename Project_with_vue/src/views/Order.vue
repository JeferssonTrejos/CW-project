<script setup>
import { ref, computed } from "vue";
import Hero from "@/components/Order/Hero.vue";
import ContactInfo from "@/components/Order/ContactInfo.vue";
import DeliveryDetails from "@/components/Order/DeliveryDetails.vue";
import ProductList from "@/components/Order/ProductList..vue";

const products = [
  {
    category: "Panes Artesanales",
    items: [
      { id: 1, name: "Pan de Masa Madre", price: 4.5, unit: "unidad" },
      { id: 2, name: "Baguette Tradicional", price: 3.25, unit: "unidad" },
      { id: 3, name: "Pan de Centeno", price: 4.75, unit: "unidad" },
      { id: 4, name: "Pan Integral Multigranos", price: 5.5, unit: "unidad" },
    ],
  },
  {
    category: "Bollería",
    items: [
      { id: 5, name: "Croissant de Mantequilla", price: 2.5, unit: "unidad" },
      { id: 6, name: "Pain au Chocolat", price: 2.95, unit: "unidad" },
    ],
  },
  {
    category: "Pasteles y Tartas",
    items: [
      { id: 7, name: "Tarta de Manzana", price: 18.5, unit: "unidad" },
      { id: 8, name: "Cheesecake", price: 22.75, unit: "unidad" },
    ],
  },
];

const formData = ref({
  name: "",
  email: "",
  phone: "",
  deliveryMethod: "pickup",
  address: "",
  city: "",
  deliveryInstructions: "",
  selectedProducts: products.flatMap((category) => category.items),
  customOrder: "",
  paymentMethod: "1",
  termsAccepted: false,
});

// Computed para habilitar/deshabilitar el botón de confirmar
const isFormValid = computed(() => {
  return (
    formData.value.name &&
    formData.value.email &&
    formData.value.phone &&
    formData.value.termsAccepted
  );
});

const handleSubmit = (event) => {
  event.preventDefault();
  if (isFormValid.value) {
    alert("¡Pedido confirmado! Gracias por tu compra.");
    console.log("Formulario enviado:", formData.value);
  } else {
    alert("Formulario inválido. Por favor, completa todos los campos.");
    console.log("Formulario inválido. Por favor, completa todos los campos.");
  }
};
</script>

<template>
  <Hero />
  <!-- Contenido de Pedidos -->
  <div class="bg-amber-50 py-16">
    <div class="container mx-auto px-4">
      <div class="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2
          class="text-2xl font-bold text-amber-800 mb-8 pb-2 border-b-2 border-amber-300"
        >
          Formulario de Pedido
        </h2>

        <form @submit="handleSubmit" class="space-y-4">
          <main class="block space-x-8 md:flex">
            <!-- Seccion de detalles del pedido -->
            <section class="flex-1">
              <ContactInfo :form-data="formData" />
              <DeliveryDetails :form-data="formData" :categories="products" />
            </section>

            <!-- Seccion de productos del pedido -->
            <section class="flex-1">
              <ProductList :form-data="formData" :products="products" />
            </section>
          </main>

          <!-- Método de Pago -->
          <div>
            <h3 class="text-xl font-semibold text-amber-800 mb-4">
              Método de Pago
            </h3>
            <div class="flex flex-col space-y-2">
              <div class="flex items-center">
                <input
                  v-model="formData.paymentMethod"
                  type="radio"
                  id="pay-store"
                  name="payment-method"
                  value="1"
                  class="mr-3 h-5 w-5 text-amber-600"
                  checked
                />
                <label for="pay-store" class="text-amber-800">
                  Pagar al recoger/recibir
                </label>
              </div>
              <div class="flex items-center">
                <input
                  v-model="formData.paymentMethod"
                  type="radio"
                  id="pay-transfer"
                  name="payment-method"
                  value="2"
                  class="mr-3 h-5 w-5 text-amber-600"
                />
                <label for="pay-transfer" class="text-amber-800">
                  Transferencia bancaria (te enviaremos los datos)
                </label>
              </div>
            </div>
          </div>

          <!-- Términos y Condiciones -->
          <div class="flex items-center">
            <input
              v-model="formData.termsAccepted"
              type="checkbox"
              id="terms"
              name="terms"
              required
              class="mr-3 h-5 w-5 text-amber-600 rounded"
            />
            <label for="terms" class="text-amber-800">
              Acepto los
              <router-link to="#" class="text-amber-600 underline">
                términos y condiciones
              </router-link>
              <span class="text-red-500">*</span>
            </label>
          </div>

          <!-- Botón de Confirmar -->
          <button
            type="submit"
            :disabled="!isFormValid"
            class="bg-amber-600 text-white w-full py-4 rounded-lg hover:bg-amber-700 transition-colors font-medium text-lg cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirmar Pedido
          </button>
        </form>
      </div>
    </div>
  </div>
</template>