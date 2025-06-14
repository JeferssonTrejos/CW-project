<template>
  <div>
    <button 
      @click="addToCart" 
      type="button"
      class="w-full bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-md transition-colors flex items-center justify-center gap-2"
      :disabled="loading"
    >
      <!-- Icono de carrito -->
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-2.5M7 13l2.5 2.5"></path>
      </svg>
      
      <span v-if="loading">Añadiendo...</span>
      <span v-else>{{ buttonText }}</span>
    </button>
    
    <div v-if="message" 
         :class="['p-2 mt-2 rounded text-center text-sm', 
                 messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
      {{ message }}
    </div>
  </div>
</template>

<script>
import api from '@/services/api';

export default {
  name: 'AddToCartButton',
  props: {
    productId: {
      type: [String, Number],
      required: true
    },
    buttonText: {
      type: String,
      default: 'Agregar al carrito'
    },
    quantity: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      loading: false,
      message: '',
      messageType: 'success'
    }
  },
  methods: {
    async addToCart() {
      this.loading = true;
      this.message = '';
      
      // Verificar si hay token (usuario logueado)
      const token = localStorage.getItem('token');
      if (!token) {
        this.message = 'Debes iniciar sesión para añadir al carrito';
        this.messageType = 'error';
        this.loading = false;
        
        // Guardar la URL actual para redirigir después del login
        localStorage.setItem('redirectAfterLogin', window.location.pathname);
        
        // Redirigir a login después de 2 segundos
        setTimeout(() => {
          this.$router.push('/login');
        }, 2000);
        return;
      }
      
      try {
        await api.post('/shoppingcart/add', 
          { 
            productId: this.productId, 
            quantity: this.quantity 
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        
        this.message = 'Producto añadido al carrito';
        this.messageType = 'success';
        
        // Emitir evento para actualizar contadores del carrito
        this.$emit('product-added');
        
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => {
          this.message = '';
        }, 3000);
        
      } catch (error) {
        console.error('Error al añadir al carrito:', error);
        
        if (error.response?.status === 401) {
          this.message = 'Sesión expirada. Por favor, inicia sesión de nuevo.';
          localStorage.removeItem('token');
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        } else {
          this.message = error.response?.data?.error || 'Error al añadir al carrito';
        }
        
        this.messageType = 'error';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>
