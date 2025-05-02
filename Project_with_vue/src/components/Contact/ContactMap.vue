<template>
  <h2 class="text-3xl font-bold text-amber-800 mb-8 relative inline-block">
    Nuestra Ubicación
  </h2>
  <div class="bg-amber-50 rounded-xl overflow-hidden shadow-lg h-96">
    <div class="w-full h-full relative bg-amber-100">
      <div class="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://i.blogs.es/b4dd5c/maps/1024_2000.png"
          alt="Mapa de ubicacion"
          class="object-cover w-full h-full opacity-40"
        />
      </div>
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="bg-white p-6 rounded-xl shadow-lg max-w-md text-center">
          <i class="fas fa-map-marker-alt text-amber-600 text-4xl mb-4"></i>
          <h3 class="text-xl font-bold text-amber-800 mb-2">
            Panadería El Rosario
          </h3>
          <p class="text-amber-700">
            Calle Principal 123,
            <br />
            San miguel, El salvador
          </p>
          <a
            href="https://maps.google.com"
            target="_blank"
            class="mt-4 inline-block bg-amber-600 text-white py-2 px-4 rounded-lg hover:bg-amber-700 transition-colors text-sm"
          >
            Ver en Google Maps
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
