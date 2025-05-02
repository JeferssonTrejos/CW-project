<script setup>
const featuredProducts = [
  {
    id: 1,
    name: "Pan Artesanal de Masa Madre",
    description:
      "Elaborado con masa madre natural y fermentación lenta de 24 horas para un sabor incomparable.",
    price: "$4.50",
    image: "/src/assets/Fresh-bakery-goods-in-supermarket.jpg",
  },
  {
    id: 2,
    name: "Croissants de Mantequilla",
    description:
      "Crujientes por fuera, suaves por dentro. Elaborados con mantequilla francesa de primera calidad.",
    price: "$2.75",
    image: "/src/assets/Fresh-bakery-goods-in-supermarket.jpg",
  },
  {
    id: 3,
    name: "Tarta de Manzana Casera",
    description:
      "Nuestra especialidad de temporada con manzanas frescas y canela, sobre masa quebrada artesanal.",
    price: "$18.95",
    image: "/src/assets/Fresh-bakery-goods-in-supermarket.jpg",
  },
];
</script>

<template>
  <section class="py-16 bg-white">
    <div class="container mx-auto px-4">
      <h2
        class="font-bold text-3xl text-amber-900 text-center mb-12"
      >
        Nuestros Productos Destacados
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="product in featuredProducts"
          :key="product.id"
          class="bg-amber-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <div class="relative h-48">
            <img
              :src="product.image"
              :alt="product.name"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="p-6">
            <div class="flex justify-between items-center mb-2">
              <h3 class="text-xl font-semibold text-amber-800">
                {{ product.name }}
              </h3>
              <span class="text-amber-600 font-bold">{{ product.price }}</span>
            </div>
            <p class="text-amber-700">{{ product.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
