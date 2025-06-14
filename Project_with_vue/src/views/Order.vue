<script setup>
import { ref, computed, onMounted } from "vue";
import Hero from "@/components/Order/Hero.vue";
import ContactInfo from "@/components/Order/ContactInfo.vue";
import DeliveryDetails from "@/components/Order/DeliveryDetails.vue";
import ProductList from "@/components/Order/ProductList..vue";
import ShoppingCartService from "@/services/ShoppingCart";
import OrderService from "@/services/Order";

const userInformation = ref([]);
const products = ref([]);
const isLoading = ref(true);
const isSubmitting = ref(false); // Nuevo: para mostrar pantalla de carga al enviar
const orderSuccess = ref(false); // Nuevo: para mostrar aviso de éxito

const formData = ref({
  name: "",
  email: "",
  phone: "",
  deliveryMethod: "1",
  address: "",
  city: "",
  postalCode: "",
  deliveryInstructions: "",
  customOrder: "",
  paymentMethod: "1",
  termsAccepted: false,
});

const loadShoppinCart = async () => {
  try {
    isLoading.value = true;
    const response = await ShoppingCartService.getShoppingCart();
    products.value = response.items;
    userInformation.value = response.user;

    // Cargar datos de usuario en el formulario
    if (userInformation.value) {
      formData.value.name = userInformation.value.name || "";
      formData.value.email = userInformation.value.email || "";
    }

    isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
};

// Computed para habilitar/deshabilitar el botón de confirmar
const isFormValid = computed(() => {
  return (
    formData.value.name &&
    formData.value.email &&
    formData.value.phone &&
    formData.value.termsAccepted
  );
});
const handleSubmit = async (event) => {
  event.preventDefault();
  if (isFormValid.value) {
    isSubmitting.value = true; // Mostrar pantalla de carga

    // Convertir los valores a número antes de enviar
    const orderData = {
      ...formData.value,
      paymentMethod: Number(formData.value.paymentMethod),
      deliveryMethod: Number(formData.value.deliveryMethod),
    };

    try {
      const response = await OrderService.createOrder(orderData);

      if (response) {
        orderSuccess.value = true; // Mostrar aviso de éxito
      }
    } catch (error) {
      console.log("Error al crear el pedido:", error);
      alert("Ocurrió un error al confirmar el pedido. Intenta nuevamente.");
    } finally {
      isSubmitting.value = false; // Ocultar pantalla de carga
    }
  } else {
    alert("Formulario inválido. Por favor, completa todos los campos.");
    console.log("Formulario inválido. Por favor, completa todos los campos.");
  }
};

const redirectToProfile = () => {
  next("/profile");
};

// Inicialización
onMounted(() => {
  loadShoppinCart();
});
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

        <!-- Pantalla de carga al enviar el pedido -->
        <div
          v-if="isSubmitting"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <div
            class="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center"
          >
            <div
              class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"
            ></div>
            <p class="text-amber-700 text-lg">Enviando pedido...</p>
          </div>
        </div>

        <!-- Aviso de éxito -->
        <div
          v-if="orderSuccess"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
        >
          <div
            class="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center"
          >
            <svg
              class="w-16 h-16 text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <p class="text-green-700 text-xl font-semibold mb-2">
              ¡Pedido confirmado!
            </p>
            <p class="text-amber-700 mb-4">Gracias por tu compra.</p>
            <router-link
              to="/profile"
              class="bg-amber-600 text-white px-6 py-2 rounded hover:bg-amber-700 transition-colors"
            >
              Cerrar
            </router-link>
          </div>
        </div>

        <div v-if="isLoading" class="text-center py-10">
          <div
            class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"
          ></div>
          <p class="mt-4 text-amber-700">Cargando...</p>
        </div>
        <form v-else @submit="handleSubmit" class="space-y-4">
          <main class="block space-x-8 md:flex">
            <!-- Seccion de detalles del pedido -->
            <section class="flex-1">
              <ContactInfo :form-data="formData" />
              <DeliveryDetails :form-data="formData" />
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
          </div>          <!-- Botón de Confirmar -->
          <button
            type="submit"
            :disabled="!isFormValid || isSubmitting"
            class="bg-amber-600 text-white w-full py-4 rounded-lg hover:bg-amber-700 transition-colors font-medium text-lg cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="submitting" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            <span>{{ submitting ? 'Procesando pedido...' : 'Confirmar Pedido' }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
