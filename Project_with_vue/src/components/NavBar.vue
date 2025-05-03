<template>
  <nav
    class="flex flex-col items-center space-x-2 font-semibold text-amber-900 bg-amber-50 md:h-auto w-full md:w-auto sm:flex-row"
  >
    <router-link to="/" class="hover:underline px-4 py-3"> Inicio </router-link>
    <router-link to="/products" class="hover:underline px-4 py-3"
      >Productos</router-link
    >
    <router-link to="/contact" class="hover:underline px-4 py-3">
      Contacto
    </router-link>
    <router-link
      to="/order"
      class="px-3 py-2 rounded-xl cursor-pointer transition-all duration-100 text-gray-100 bg-amber-600 hover:bg-amber-700"
    >
      Hacer pedido
    </router-link>
  </nav>
</template>
