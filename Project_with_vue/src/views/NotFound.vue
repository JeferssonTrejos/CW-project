<template>
  <div class="flex justify-center w-full ">
    <div class="w-full bg-gray-100 text-center py-40">
      <div>
        <h1 class="text-9xl font-bold text-gray-800">404</h1>
        <h2 class="text-4xl font-medium text-gray-600 mb-4">Página no encontrada</h2>
        <p class="text-gray-500 mb-8">
          La página que estás buscando no existe.
        </p>
        <router-link
          to="/"
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Ir al inicio
        </router-link>
      </div>
    </div>
  </div>
</template>

