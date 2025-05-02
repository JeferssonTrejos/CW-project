<script setup>
const featuredProducts = [
  {
    id: 1,
    name: "Pan Artesanal de Masa Madre",
    description:
      "Elaborado con masa madre natural y fermentación lenta de 24 horas para un sabor incomparable.",
    price: "$4.50",
    image: "https://i.pinimg.com/originals/4c/e1/b7/4ce1b72c97c678b0ca03fc78e82bf620.jpg",
  },
  {
    id: 2,
    name: "Croissants de Mantequilla",
    description:
      "Crujientes por fuera, suaves por dentro. Elaborados con mantequilla francesa de primera calidad.",
    price: "$2.75",
    image: "https://avatars.mds.yandex.net/i?id=e9e700d595dd2faf645bc7f76b7a29c48a545615-4264887-images-thumbs&n=13",
  },
  {
    id: 3,
    name: "Tarta de Manzana Casera",
    description:
      "Nuestra especialidad de temporada con manzanas frescas y canela, sobre masa quebrada artesanal.",
    price: "$18.95",
    image: "https://avatars.mds.yandex.net/i?id=763536c7fa2b4d94232bcdd242f97282d20e3f3b-10018920-images-thumbs&n=13",
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
