<script setup>
import AddToCartButton from "../Cart/AddToCartButton.vue";
import { onMounted } from "vue";

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  formData: {
    type: Object,
    required: true,
  },
});

const addingToCart = ref({});
const inCart = ref({});

// Inicializar la cantidad para cada producto
onMounted(() => {
  props.items.forEach((product) => {
    if (!product.quantity) {
      product.quantity = 1;
    }
  });
  
  // Verificar si algunos productos ya están en el carrito
  fetchCartStatus();
});

// Obtener el estado actual del carrito para saber qué productos ya están añadidos
const fetchCartStatus = async () => {
  try {
    const response = await api.get('/shoppingcart');
    const cartItems = response.data.items || [];
    
    // Marcar productos que ya están en el carrito
    cartItems.forEach(item => {
      inCart.value[item.product._id] = true;
    });
  } catch (error) {
    console.error("Error al obtener estado del carrito:", error);
  }
};

// Función para agregar selecciones al carrito
const addSelectedToCart = async (product) => {
  if (addingToCart.value[product._id]) return;
  
  addingToCart.value[product._id] = true;
  
  try {
    console.log('Agregando al carrito:', {
      productId: product._id,
      quantity: product.quantity
    });
    
    // Enviar producto al carrito
    const response = await api.post('/shoppingcart/add', { 
      productId: product._id, 
      quantity: parseInt(product.quantity) || 1
    });
    
    console.log('Respuesta del servidor:', response.data);
    
    // Marcar como añadido al carrito
    inCart.value[product._id] = true;
    
    // Notificar actualización del carrito
    window.dispatchEvent(new CustomEvent('cart-updated'));
    
    // Mostrar mensaje breve sin bloquear con alert
    const message = document.createElement('div');
    message.textContent = `${product.name} añadido al carrito`;
    message.style.cssText = 'position: fixed; bottom: 20px; right: 20px; background-color: #059669; color: white; padding: 12px 20px; border-radius: 8px; z-index: 1000; box-shadow: 0 2px 10px rgba(0,0,0,0.2);';
    document.body.appendChild(message);
    
    // Eliminar el mensaje después de 3 segundos
    setTimeout(() => {
      document.body.removeChild(message);
    }, 3000);
    
  } catch (error) {
    console.error('Error al añadir al carrito:', error);
    
    if (error.response?.status === 401) {
      alert('Necesitas iniciar sesión para añadir productos al carrito');
      localStorage.setItem('redirectAfterLogin', window.location.pathname);
      setTimeout(() => {
        router.push('/login');
      }, 1000);
    } else {
      alert(error.response?.data?.error || 'Error al añadir al carrito');
    }
  } finally {
    addingToCart.value[product._id] = false;
  }
};

// Función para manejar el cambio de selección
const handleSelectionChange = (product, isSelected) => {
  if (isSelected) {
    // Si el producto se seleccionó y no está en el carrito, agregarlo automáticamente
    if (!inCart.value[product._id]) {
      addSelectedToCart(product);
    }
  }
};
</script>

<template>
  <div
    v-for="product in items"
    :key="product._id"
    class="flex flex-col bg-amber-50 p-3 rounded-lg"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <!-- <input
          type="checkbox"
          :id="product._id"
          :value="product"
          v-model="formData.selectedProducts"
          @change="(e) => handleSelectionChange(product, e.target.checked)"
          class="mr-3 h-5 w-5 text-amber-600 rounded focus:ring-amber-500"
        /> -->
        <label :for="product.id" class="text-amber-800">
          {{ product.name }}
          <span class="block text-xs text-amber-600">
            ${{ typeof product.price === 'number' ? product.price.toFixed(2) : product.price }} / {{ product.unit || 'unidad' }}
          </span>
        </label>
      </div>
      <div class="w-20">
        <div class="flex">
          <!-- <input
            type="number"
            min="1"
            v-model.number="product.quantity"
            class="w-full px-2 py-1 text-center border border-amber-200 rounded"
            :aria-label="'Cantidad de ' + product.name"
          /> -->
        </div>
      </div>
    </div>
<<<<<<< HEAD
    <!-- Botón Agregar al carrito -->
    <!-- <div class="mt-2 ml-8">
      <AddToCartButton
        :productId="product.id.toString()"
        :quantity="product.quantity"
      />
    </div> -->
=======
    
    <!-- Botón Agregar al carrito -->
    <div class="mt-2 ml-8">
      <button 
        @click="addSelectedToCart(product)" 
        :disabled="addingToCart[product._id]"
        class="flex items-center justify-center w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition-colors gap-2"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-2.5M7 13l2.5 2.5"></path>
        </svg>
        <span v-if="addingToCart[product._id]">Añadiendo...</span>
        <span v-else>{{ inCart[product._id] ? 'Actualizar en carrito' : 'Agregar al carrito' }}</span>
      </button>
      <div v-if="inCart[product._id]" class="text-xs text-green-600 mt-1 text-center">
        ✓ Ya está en tu carrito
      </div>
    </div>
>>>>>>> refs/remotes/origin/main
  </div>
</template>
