<template>
  <div>
   
    <section v-if="products.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in products"
          :key="product._id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
        >
          
          <div class="relative h-48 bg-gray-200">
            <img
              :src="product.image || 'https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL'"
              :alt="product.name"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
            
            
            <div
              v-if="product.isHighlighted"
              class="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-semibold"
            >
              Destacado
            </div>
            
            
            <div
              v-if="!product.isAvailable"
              class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold"
            >
              Agotado
            </div>
          </div>

          
          <div class="p-4 flex-grow flex flex-col">
        
            <div v-if="product.category" class="mb-2">
              <span class="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                {{ getCategoryName(product.category) }}
              </span>
            </div>

            
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              {{ product.name }}
            </h3>

            
            <p class="text-gray-600 text-sm mb-3 overflow-hidden flex-grow">
              {{ product.description }}
            </p>

            
            <div class="mt-auto">
              <span class="block text-xl font-bold text-amber-600 mb-2">
                {{ formatPrice(product.price) }}
              </span>

              <div v-if="product.isAvailable" class="w-full">                <AddToCartButton 
                  :product-id="product._id" 
                  button-text="Agregar al carrito" 
                  @product-added="onProductAdded"
                />
                
                <!-- Contador de productos añadidos -->
                <div v-if="cartCounts[product._id] && cartCounts[product._id] > 0" 
                     class="mt-2 text-center text-amber-800 font-medium">
                  <span class="bg-amber-100 px-3 py-1 rounded-full text-sm">
                    {{ cartCounts[product._id] }} en tu carrito
                  </span>
                </div>
              </div>

              <span
                v-else
                class="block text-center text-gray-500 text-sm py-2"
              >
                No disponible
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section v-else class="text-center py-12">
      <div class="bg-gray-50 rounded-lg p-8">
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
        <p class="text-gray-500 mb-4">
          Intenta ajustar los filtros o buscar con diferentes términos.
        </p>
        <button 
          @click="$emit('clear-filters')"
          class="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Ver todos los productos
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import AddToCartButton from '@/components/Cart/AddToCartButton.vue';
import api from '@/services/api';
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  products: {
    type: Array,
    default: () => []
  }
});

const emits = defineEmits(['add-to-cart', 'clear-filters']);

const cartCounts = ref({});

// Función para obtener las cantidades actuales de productos en el carrito
const fetchCartCounts = async () => {
  try {
    const response = await api.get('/shoppingcart');
    const cart = response.data;
    
    // Resetear contadores
    const counts = {};
    
    // Si hay productos en el carrito, actualizar contadores
    if (cart && cart.items && cart.items.length > 0) {
      cart.items.forEach(item => {
        counts[item.product._id] = item.quantity;
      });
    }
    
    cartCounts.value = counts;
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
  }
};

// Actualizar el contador para un producto específico
const onProductAdded = (event) => {
  const { productId, quantity } = event;
  
  // Actualizar el contador local
  if (cartCounts.value[productId]) {
    cartCounts.value[productId] += quantity;
  } else {
    cartCounts.value[productId] = quantity;
  }
  
  // Disparar evento personalizado para actualizar el icono del carrito
  window.dispatchEvent(new CustomEvent('cart-updated'));
};

// Escuchar evento de actualización del carrito desde otros componentes
const handleCartUpdated = () => {
  fetchCartCounts();
};

onMounted(() => {
  fetchCartCounts();
  window.addEventListener('cart-updated', handleCartUpdated);
});

onBeforeUnmount(() => {
  window.removeEventListener('cart-updated', handleCartUpdated);
});

const formatPrice = (price) => {
  if (!price) return 'Precio no disponible';
  
  if (typeof price === 'string' && price.includes('$')) {
    return price;
  }
  
  if (typeof price === 'number') {
    return `$${price.toFixed(2)}`;
  }
  
  return `$${parseFloat(price).toFixed(2)}`;
};

const getCategoryName = (category) => {
  if (!category) return 'Sin categoría';
  
  if (typeof category === 'object' && category.name) {
    return category.name;
  }
  
  return category;
};

const handleImageError = (event) => {
  event.target.src = 'https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL';
};
</script>