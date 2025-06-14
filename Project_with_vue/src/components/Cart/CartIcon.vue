<template>
  <div class="relative">
    <router-link to="/cart" class="inline-flex items-center justify-center text-amber-800 hover:text-amber-600 transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <span v-if="itemCount > 0" class="absolute -top-2 -right-2 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
        {{ itemCount }}
      </span>
    </router-link>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'CartIcon',
  data() {
    return {
      itemCount: 0
    }
  },
  mounted() {
    this.fetchCartCount();
    
    // Escuchar el evento personalizado para actualizar el contador
    window.addEventListener('cart-updated', this.fetchCartCount);
  },
  beforeUnmount() {
    // Limpiar el evento al destruir el componente
    window.removeEventListener('cart-updated', this.fetchCartCount);
  },
  methods: {
    async fetchCartCount() {
      try {
        const response = await api.get('/shoppingcart');
        const cart = response.data;
        this.itemCount = cart && cart.items ? cart.items.length : 0;
      } catch (error) {
        console.error('Error al obtener el contador del carrito:', error);
        this.itemCount = 0;
      }
    }
  }
}
</script>
