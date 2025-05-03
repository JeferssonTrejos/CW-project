<script setup>
import Branding from "./Branding.vue";
import NavBar from "./NavBar.vue";
import { Menu } from "lucide-vue-next";
import { X } from "lucide-vue-next"; // Icono para el botón de cerrar
import { ref } from "vue";

const isMenuOpen = ref(false);

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenu() {
  isMenuOpen.value = false;
}
</script>

<template>
  <header class="bg-amber-50 shadow sticky top-0 z-50">
    <div class="container mx-auto flex items-center justify-between px-4 py-4">
      <!-- Branding -->
      <Branding />

      <!-- Boton en mobile -->
      <button class="block md:hidden text-gray-700" @click="toggleMenu">
        <Menu class="h-6 w-6 cursor-pointer"></Menu>
      </button>

      <!-- Menu de navegacion -->
      <div
        :class="[
          'w-full md:w-auto fixed md:static top-0 left-0 right-0 bg-amber-50 z-40',
          isMenuOpen
            ? 'flex md:flex-row items-center justify-center'
            : 'hidden md:block',
        ]"
      >
        <div class="p-5 md:p-0">
          <NavBar class="flex-1" />
        </div>
        <!-- Botón para cerrar el menú en móviles -->
        <button class="block md:hidden text-gray-700 p-2" @click="toggleMenu">
          <X class="h-6 w-6 cursor-pointer" />
        </button>
      </div>
    </div>
  </header>
</template>
