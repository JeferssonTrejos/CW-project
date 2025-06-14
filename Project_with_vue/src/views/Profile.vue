<script setup>
import { ref, onMounted, computed } from "vue";
import { useAuthStore } from "../stores/auth";

import api from "../services/api";

const authStore = useAuthStore();
const orders = ref([]);
const isLoading = ref(true);

// Mapeo de estados numéricos a texto
const statusMap = {
  1: "Pendiente",
  2: "En preparación",
  3: "En camino",
  4: "Entregado",
};

// Mapeo de métodos de entrega
const deliveryMethodMap = {
  1: "Recoger en tienda",
  2: "Entrega a domicilio",
};

// Mapeo de métodos de pago
const paymentMethodMap = {
  1: "Efectivo",
  2: "Tarjeta de crédito",
};

const getMyOrders = async () => {
  try {
    const response = await api.get("/orders");
    orders.value = response.data.orders.reverse();
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
  } finally {
    isLoading.value = false;
  }
};

const ordersFormatted = computed(() =>
  orders.value.map((order) => ({
    id: order._id,
    status: statusMap[order.status] || "Desconocido",
    deliveryMethod:
      deliveryMethodMap[order.deliveryDetails.deliveryMethod] || "Desconocido",
    paymentMethod: paymentMethodMap[order.paymentMethod] || "Desconocido",
    items: order.items.map((item) => ({
      name: item.productName,
      quantity: item.quantity,
      price: item.price,
    })),
    total: order.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    deliveryInstructions: order.deliveryDetails.deliveryInstructions,
    address: order.deliveryDetails.address,
    city: order.deliveryDetails.city,
    phone: order.deliveryDetails.phone,
    postalCode: order.deliveryDetails.postalCode,
  }))
);

onMounted(getMyOrders);
</script>

<template>
  <div class="min-h-screen bg-amber-50 py-8">
    <div class="container mx-auto px-4">
      <div
        class="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div class="flex flex-col-reverse md:flex-row gap-8 p-6">
          <!-- Pedidos (Izquierda) -->
          <div class="md:w-2/3 w-full">
            <h2 class="text-3xl font-bold mb-6 text-amber-800 border-b pb-2">
              Mis Pedidos
            </h2>

            <div v-if="isLoading" class="text-center py-10">
              <div
                class="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"
              ></div>
              <p class="mt-4 text-gray-600">Cargando tus pedidos...</p>
            </div>

            <div v-else-if="orders.length === 0" class="text-center py-10">
              <p class="text-gray-500 text-lg mb-4">No tienes pedidos aún.</p>
              <router-link
                to="/products"
                class="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-medium"
              >
                Ver Productos
              </router-link>
            </div>

            <div v-else>
              <div
                v-for="order in ordersFormatted"
                :key="order.id"
                class="mb-6 border border-amber-200 rounded-xl p-5 hover:shadow-md transition"
              >
                <div
                  class="flex flex-col md:flex-row md:justify-between md:items-center mb-3"
                >
                  <div>
                    <span class="font-semibold text-lg"
                      >Pedido #{{ order.id.substring(0, 8) }}</span
                    >
                  </div>
                  <span
                    class="mt-2 md:mt-0 px-3 py-1 rounded-full text-sm font-medium"
                    :class="{
                      'bg-yellow-100 text-yellow-800':
                        order.status === 'Pendiente',
                      'bg-blue-100 text-blue-800':
                        order.status === 'En preparación',
                      'bg-purple-100 text-purple-800':
                        order.status === 'En camino',
                      'bg-green-100 text-green-800':
                        order.status === 'Entregado',
                      'bg-gray-100 text-gray-800':
                        order.status === 'Desconocido',
                    }"
                  >
                    {{ order.status }}
                  </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p class="text-sm text-gray-600">Método de entrega</p>
                    <p class="font-medium">{{ order.deliveryMethod }}</p>
                  </div>
                  <div>
                    <p class="text-sm text-gray-600">Método de pago</p>
                    <p class="font-medium">{{ order.paymentMethod }}</p>
                  </div>
                </div>

                <ul class="mb-4">
                  <li
                    v-for="(item, index) in order.items"
                    :key="index"
                    class="flex justify-between py-2 border-b border-amber-100"
                  >
                    <span class="text-gray-700">
                      {{ item.quantity }} x {{ item.name }}
                      <span class="text-gray-500 text-sm block"
                        >${{ item.price.toFixed(2) }} c/u</span
                      >
                    </span>
                    <span class="font-medium"
                      >${{ (item.price * item.quantity).toFixed(2) }}</span
                    >
                  </li>
                </ul>

                <div
                  v-if="order.deliveryInstructions"
                  class="mb-3 p-3 bg-amber-50 rounded-lg text-sm"
                >
                  <p class="font-semibold text-amber-700">
                    Instrucciones de entrega:
                  </p>
                  <p class="text-gray-700">{{ order.deliveryInstructions }}</p>
                </div>

                <div class="flex justify-between items-center">
                  <div>
                    <p class="text-gray-500 text-sm">
                      ID: {{ order.id.substring(0, 12) }}...
                    </p>
                  </div>
                  <div class="font-bold text-lg">
                    Total: ${{ order.total.toFixed(2) }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Información del usuario (Derecha) -->
          <div class="md:w-1/3 w-full">
            <div class="bg-amber-50 rounded-xl p-6 border border-amber-200">
              <h3 class="text-2xl font-bold mb-4 text-amber-800 border-b pb-2">
                Mi Perfil
              </h3>
              <div class="space-y-4">
                <div class="border-b border-amber-100 pb-3">
                  <div class="font-semibold text-gray-600">Nombre</div>
                  <div class="text-gray-800">{{ authStore.user.name }}</div>
                </div>
                <div class="border-b border-amber-100 pb-3">
                  <div class="font-semibold text-gray-600">Email</div>
                  <div class="text-gray-800">{{ authStore.user.email }}</div>
                </div>
                <div class="border-b border-amber-100 pb-3">
                  <div class="font-semibold text-gray-600">Rol</div>
                  <div class="text-gray-800 capitalize">
                    {{ authStore.userRole }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
