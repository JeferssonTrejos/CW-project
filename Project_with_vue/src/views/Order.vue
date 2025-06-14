<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from 'vue-router';
import api from "@/services/api";
import Hero from "@/components/Order/Hero.vue";
import ContactInfo from "@/components/Order/ContactInfo.vue";
import DeliveryDetails from "@/components/Order/DeliveryDetails.vue";
import ProductList from "@/components/Order/ProductList..vue";

const router = useRouter();

const products = ref([]);
const loading = ref(true);
const error = ref(null);

const formData = ref({
  name: "",
  email: "",
  phone: "",
  deliveryMethod: "pickup",
  address: "",
  city: "",
  deliveryInstructions: "",
  selectedProducts: [],
  customOrder: "",
  paymentMethod: "1",
  termsAccepted: false,
});

// Cargar productos desde el API y organizarlos por categoría
const fetchProducts = async () => {
  try {
    loading.value = true;
    error.value = null;

    // Obtener todos los productos disponibles
    const productsResponse = await api.get("/products");
    const allProducts = productsResponse.data;

    // Organizar productos por categoría
    const categorizedProducts = {};

    allProducts.forEach((product) => {
      if (product.isAvailable) {
        const categoryName = product.category
          ? product.category.name
          : "Sin categoría";

        if (!categorizedProducts[categoryName]) {
          categorizedProducts[categoryName] = [];
        }

        // Añadir cantidad al producto para el carrito
        categorizedProducts[categoryName].push({
          ...product,
          quantity: 1,
        });
      }
    });

    // Convertir a formato esperado por el componente ProductCategory
    const productCategories = Object.keys(categorizedProducts).map(
      (category) => ({
        category,
        items: categorizedProducts[category],
      })
    );

    products.value = productCategories;
    console.log("Productos cargados y organizados:", productCategories);
  } catch (err) {
    console.error("Error al cargar productos:", err);
    error.value =
      "Error al cargar productos. Por favor, inténtalo de nuevo más tarde.";
  } finally {
    loading.value = false;
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

const submitting = ref(false);

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!isFormValid.value) {
    alert("Formulario inválido. Por favor, completa todos los campos obligatorios.");
    return;
  }
  
  try {
    submitting.value = true;
    
    // Obtener el carrito actual para comparar con los productos seleccionados
    let cartItems = [];
    try {
      const cartResponse = await api.get('/shoppingcart');
      cartItems = cartResponse.data.items || [];
    } catch (cartErr) {
      console.error("Error al obtener el carrito:", cartErr);
    }
    
    // Verificar si hay productos seleccionados que no están en el carrito
    if (formData.value.selectedProducts && formData.value.selectedProducts.length > 0) {
      const cartProductIds = cartItems.map(item => item.product._id);
      const missingProducts = formData.value.selectedProducts.filter(product => 
        !cartProductIds.includes(product._id)
      );
      
      if (missingProducts.length > 0) {
        const missingNames = missingProducts.map(p => p.name).join(", ");
        const answer = confirm(`Los siguientes productos seleccionados no están en tu carrito: ${missingNames}. ¿Deseas agregarlos antes de continuar?`);
        
        if (answer) {
          // Agregar los productos seleccionados al carrito
          for (const product of missingProducts) {
            try {
              await api.post('/shoppingcart/add', { 
                productId: product._id, 
                quantity: product.quantity || 1 
              });
              console.log(`Producto agregado al carrito: ${product.name}`);
            } catch (err) {
              console.error(`Error al agregar ${product.name} al carrito:`, err);
            }
          }
          
          // Actualizar contador del carrito
          window.dispatchEvent(new CustomEvent('cart-updated'));
        } else {
          // Si el usuario no quiere agregar los productos, mostramos un mensaje y cancelamos
          if (!confirm("¿Estás seguro de continuar sin agregar todos los productos seleccionados al carrito?")) {
            submitting.value = false;
            return;
          }
        }
      }
    } else {
      // Verificar si el carrito está vacío
      if (cartItems.length === 0) {
        if (!confirm("Tu carrito está vacío. ¿Estás seguro de que deseas realizar un pedido sin productos?")) {
          submitting.value = false;
          return;
        }
      }
    }
    
    // Preparar datos de la orden
    const orderData = {
      deliveryMethod: formData.value.deliveryMethod === 'pickup' ? 1 : 2,
      address: formData.value.address,
      city: formData.value.city,
      phone: formData.value.phone,
      deliveryInstructions: formData.value.deliveryInstructions,
      paymentMethod: parseInt(formData.value.paymentMethod),
      additionalInstructions: formData.value.customOrder
    };
      // Enviar la orden al backend
    const response = await api.post('/orders', orderData);
    
    // Limpiar el formulario
    formData.value = {
      name: "",
      email: "",
      phone: "",
      deliveryMethod: "pickup",
      address: "",
      city: "",
      deliveryInstructions: "",
      selectedProducts: [],
      customOrder: "",
      paymentMethod: "1",
      termsAccepted: false
    };
    
    // Limpiar el carrito después de confirmar el pedido
    try {
      await api.delete('/shoppingcart/clear');
      console.log("Carrito limpiado después de confirmar el pedido");
    } catch (clearError) {
      console.error("Error al limpiar el carrito:", clearError);
    }
    
    // Actualizar contadores de carrito
    window.dispatchEvent(new CustomEvent('cart-updated'));
    
    // Mostrar mensaje de éxito
    alert("¡Pedido confirmado! Gracias por tu compra.");
    
    // Redirigir al inicio o a una página de confirmación
    setTimeout(() => {
      router.push('/');
    }, 2000);
    
    console.log("Pedido enviado con éxito:", response.data);
    
  } catch (error) {
    console.error("Error al enviar el pedido:", error);
    alert("Ocurrió un error al procesar tu pedido. Por favor, intenta nuevamente.");
  } finally {
    submitting.value = false;
  }
};

// Cargar datos al montar el componente
onMounted(() => {
  fetchProducts();
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

        <div v-if="loading" class="text-center py-10">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p class="mt-4 text-amber-700">Cargando productos...</p>
        </div>

        <div
          v-else-if="error"
          class="text-center py-10 bg-red-50 border border-red-200 rounded-lg p-6"
        >
          <p class="text-red-600 mb-4">{{ error }}</p>
        </div>

        <form v-else @submit="handleSubmit" class="space-y-4">
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
          </div>          <!-- Botón de Confirmar -->
          <button
            type="submit"
            :disabled="!isFormValid || submitting"
            class="bg-amber-600 text-white w-full py-4 rounded-lg hover:bg-amber-700 transition-colors font-medium text-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="submitting" class="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            <span>{{ submitting ? 'Procesando pedido...' : 'Confirmar Pedido' }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>