<template>
  <div class="py-8">
    <div class="container mx-auto px-4">
      <h2 class="text-2xl font-bold mb-8 text-amber-800">
        Tu Carrito de Compras
      </h2>

      <div v-if="loading" class="text-center py-10">
        <div
          class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"
        ></div>
        <p class="mt-4 text-amber-700">Cargando tu carrito...</p>
      </div>

      <div
        v-else-if="error"
        class="text-center py-10 bg-red-50 border border-red-200 rounded-lg p-6"
      >
        <p class="text-red-600 mb-4">{{ error }}</p>
        <router-link
          to="/products"
          class="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors"
        >
          Ver productos
        </router-link>
      </div>

      <div
        v-else-if="!cart || !cart.items || cart.items.length === 0"
        class="text-center py-10 bg-amber-50 border border-amber-200 rounded-lg p-6"
      >
        <p class="text-amber-800 text-lg mb-4">Tu carrito está vacío</p>
        <p class="text-amber-700 mb-6">
          Agrega algunos productos deliciosos para comenzar tu pedido.
        </p>
        <router-link
          to="/products"
          class="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Ver productos
        </router-link>
      </div>

      <div v-else class="flex flex-col md:flex-row gap-8">
        <div class="md:w-2/3">
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="space-y-4">
              <div
                v-for="item in cart.items"
                :key="item.product._id"
                class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-amber-100"
              >
                <div class="flex items-center gap-4 mb-2 sm:mb-0">
                  <!-- <img
                    :src="
                      item.product.image ||
                      'https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL'
                    "
                    :alt="item.product.name"
                    class="w-16 h-16 object-cover rounded"
                  /> -->
                  <div>
                    <h3 class="font-medium text-amber-800">
                      {{ item.product.name }}
                    </h3>
                    <p class="text-amber-600 text-sm">
                      {{ item.product.category?.name || "Producto" }}
                    </p>
                    <p class="font-bold text-amber-900">
                      ${{ formatPrice(item.product.price) }}
                    </p>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <div
                    class="flex items-center border border-amber-200 rounded"
                  >
                    <button
                      @click="decreaseQuantity(item)"
                      class="w-8 h-8 flex items-center justify-center text-amber-600 hover:bg-amber-50"
                    >
                      -
                    </button>
                    <span class="w-10 text-center">{{ item.quantity }}</span>
                    <button
                      @click="increaseQuantity(item)"
                      class="w-8 h-8 flex items-center justify-center text-amber-600 hover:bg-amber-50"
                    >
                      +
                    </button>
                  </div>

                  <div class="text-right min-w-[80px]">
                    <p class="font-bold text-amber-900">
                      ${{ formatPrice(item.quantity * item.product.price) }}
                    </p>
                    <button
                      @click="removeItem(item.product._id)"
                      class="text-red-600 hover:text-red-800 text-sm mt-1"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="md:w-1/3">
          <div class="bg-amber-50 p-6 rounded-lg shadow-md sticky top-4">
            <h3 class="text-xl font-bold mb-4 text-amber-800">
              Resumen del pedido
            </h3>

            <div class="space-y-2 mb-4">
              <div class="flex justify-between py-2 border-b border-amber-200">
                <span class="text-amber-700">Subtotal</span>
                <span class="font-medium"
                  >${{ formatPrice(calculateTotal()) }}</span
                >
              </div>
              <div class="flex justify-between py-2">
                <span class="font-bold text-amber-800">Total</span>
                <span class="font-bold text-amber-800"
                  >${{ formatPrice(calculateTotal()) }}</span
                >
              </div>
            </div>

            <button
              @click="proceedToCheckout"
              class="w-full bg-amber-600 hover:bg-amber-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Proceder al pago
            </button>

            <router-link
              to="/products"
              class="block text-center mt-4 text-amber-600 hover:text-amber-700"
            >
              Seguir comprando
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/services/api.js";
import ShoppingCartService from "@/services/ShoppingCart";

export default {
  name: "CartView",
  data() {
    return {
      cart: null,
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchCart();
  },
  methods: {
    async fetchCart() {
      this.loading = true;
      this.error = null;

      try {
        const response = await ShoppingCartService.getShoppingCart();
        this.cart = response;
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
        this.error =
          error.response?.data?.error || "Error al cargar el carrito";
      } finally {
        this.loading = false;
      }
    },

    async updateQuantity(productId, quantity) {
      try {
        await ShoppingCartService.updateCartItem(productId, quantity);
        await this.fetchCart();
      } catch (error) {
        console.error("Error al actualizar cantidad:", error);
        this.error =
          error.response?.data?.error || "Error al actualizar la cantidad";
      }
    },

    increaseQuantity(item) {
      this.updateQuantity(item.product._id, item.quantity + 1);
    },

    decreaseQuantity(item) {
      if (item.quantity > 1) {
        this.updateQuantity(item.product._id, item.quantity - 1);
      }
    },

    async removeItem(productId) {
      try {
        await ShoppingCartService.removeFromCart(productId);
        await this.fetchCart();
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        this.error =
          error.response?.data?.error || "Error al eliminar el producto";
      }
    },

    calculateTotal() {
      if (!this.cart || !this.cart.items) return 0;
      return this.cart.items.reduce((total, item) => {
        return total + item.product.price * item.quantity;
      }, 0);
    },

    formatPrice(price) {
      return Number(price).toFixed(2);
    },

    proceedToCheckout() {
      this.$router.push("/order");
    },
  },
};
</script>
