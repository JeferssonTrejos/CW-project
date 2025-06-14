<script setup>
import Branding from "./Branding.vue";
import NavBar from "./NavBar.vue";
import CartIcon from "./Cart/CartIcon.vue";
import { Menu } from "lucide-vue-next";
import { X } from "lucide-vue-next";
import { ref } from "vue";

import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const handleLogout = async () => {
  await authStore.logout();
  router.push("/");
};

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}
</script>

<template>
  <header class="bg-amber-50 shadow sticky top-0 z-50">
    <div class="container mx-auto flex items-center justify-between px-4 py-4">
      <!-- Branding -->
      <Branding />

      <!-- Desktop Navigation -->
      <nav class="flex">
        <div class="hidden md:flex items-center space-x-4">
          <NavBar />
          <template v-if="authStore.isAuthenticated">
            <div
              class="flex items-center hover:bg-black/20 p-2 rounded-lg cursor-pointer"
            >
              <router-link
                to="/profile"
                class="text-amber-800 font-medium text-center flex items-center h-full"
              >
                Hola, {{ authStore.user?.name?.slice(0, 12) }}
                {{ authStore.user?.name?.length > 12 ? "..." : "" }}
              </router-link>
            </div>
            <!-- Icono del carrito -->
            <div
              class="px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              <CartIcon />
            </div>
            <!-- <router-link
              to="/order"
              class="px-4 py-2 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-colors"
            >
              Hacer pedido
            </router-link> -->
          </template>
          <template v-else class="flex items-center space-x-4">
            <router-link
              to="/login"
              class="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
            >
              Iniciar Sesión
            </router-link>
          </template>
        </div>
        <!-- Mobile Menu Button -->
        <button
          class="text-amber-800 py-2 px-4 cursor-pointer"
          @click="toggleMenu"
        >
          <Menu class="h-6 w-6" />
        </button>
      </nav>
    </div>

    <!-- Superposicion del menu de movil -->
    <div
      v-if="isMenuOpen"
      class="fixed inset-0 bg-black/50 z-40"
      @click="toggleMenu"
    ></div>

    <!-- Mobile Menu -->
    <div
      :class="[
        ' fixed top-0 right-0 h-full w-96 max-w-full bg-amber-50 shadow-lg transform transition-transform z-50',
        isMenuOpen ? 'translate-x-0' : 'translate-x-full',
      ]"
    >
      <div class="flex flex-col h-full">
        <!-- Mobile Menu Header -->
        <div
          class="flex items-center justify-between p-4 border-b border-amber-200"
        >
          <span class="text-lg font-semibold text-amber-900">Menú</span>
          <button @click="toggleMenu" class="text-amber-800 p-2">
            <X class="h-6 w-6" />
          </button>
        </div>

        <!-- Mobile Navigation -->
        <div class="flex-1 p-4">
          <nav class="space-y-2">
            <router-link
              to="/"
              @click="toggleMenu"
              class="block px-4 py-3 text-amber-900 font-semibold hover:bg-amber-100 rounded-lg transition-colors"
            >
              Inicio
            </router-link>
            <router-link
              to="/products"
              @click="toggleMenu"
              class="block px-4 py-3 text-amber-900 font-semibold hover:bg-amber-100 rounded-lg transition-colors"
            >
              Productos
            </router-link>
            <router-link
              to="/contact"
              @click="toggleMenu"
              class="block px-4 py-3 text-amber-900 font-semibold hover:bg-amber-100 rounded-lg transition-colors"
            >
              Contacto
            </router-link>
            <router-link
              to="/cart"
              @click="toggleMenu"
              class="flex justify-center items-center gap-2 px-4 py-3 text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors font-semibold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Ver carrito
            </router-link>
            <!-- <router-link
              to="/order"
              @click="toggleMenu"
              class="block px-4 py-3 text-center text-white bg-amber-600 hover:bg-amber-700 rounded-lg transition-colors font-semibold"
            >
              Hacer pedido
            </router-link> -->
          </nav>
        </div>

        <!-- Mobile Auth Section -->
        <div class="p-4 border-t border-amber-200">
          <template v-if="authStore.isAuthenticated">
            <p class="text-amber-800 font-medium mb-3 text-center">
              Hola, {{ authStore.user?.name }}
            </p>
            <button
              @click="handleLogout"
              class="w-full px-4 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
            >
              Cerrar Sesión
            </button>
          </template>
          <template v-else>
            <router-link
              to="/login"
              @click="toggleMenu"
              class="block w-full px-4 py-3 text-center bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-semibold"
            >
              Iniciar Sesión
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>
