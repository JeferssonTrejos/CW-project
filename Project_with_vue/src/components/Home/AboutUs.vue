<template>
  <section class="py-16 bg-amber-50">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-center gap-8">
        <div class="md:w-1/2">
          <h2 class="font-bold text-3xl text-amber-900 mb-5">Sobre Nosotros</h2>
          <p class="text-amber-700 mb-4">
            Panadería El Trigo Dorado nació en 1985 con la misión de preservar y
            compartir los auténticos sabores de la panadería tradicional.
            Ubicados en el corazón de la ciudad, nos enorgullece ofrecer
            productos artesanales elaborados con ingredientes frescos y de
            primera calidad.
          </p>
          <p class="text-amber-700 mb-6">
            Nuestra panadería está dirigida por el maestro panadero Juan
            Hernández, quien aprendió las recetas tradicionales de su abuelo y
            ha dedicado su vida a perfeccionar el arte de la panadería. En El
            Trigo Dorado, no solo ofrecemos pan, sino una experiencia sensorial
            completa.
          </p>
          <router-link
            to="/contact"
            class="bg-amber-600 text-white hover:bg-amber-100 font-semibold py-2 px-6 rounded-md text-center"
            >Ver Productos</router-link
          >
        </div>
        <div
          class="md:w-1/2 sm:w-3/4 w-full h-96 rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src="https://thumbs.dreamstime.com/b/smiling-women-selling-fresh-pastry-loaves-two-happy-female-seller-bread-section-85188042.jpg"
            alt="Panadería El Trigo Dorado"
            fill
            class="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  </section>
</template>
