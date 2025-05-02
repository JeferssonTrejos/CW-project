<script setup>
const upcomingEvents = [
  {
    id: 1,
    title: "Taller de Panadería Básica",
    date: "15 de Julio, 2025",
    description:
      "Aprende los fundamentos de la panadería artesanal y llévate a casa tu propio pan recién horneado.",
    image: "https://avatars.mds.yandex.net/i?id=d0f6972d7ff3d3c10d0d5940681c081f-4884516-images-thumbs&n=13",
  },
  {
    id: 2,
    title: "Degustación de Panes Especiales",
    date: "22 de Julio, 2025",
    description:
      "Ven a probar nuestra nueva línea de panes con granos antiguos y harinas especiales.",
    image: "https://www.javea.com/wp-content/uploads/2016/03/pasteles-austriaco-cafe-wien-1-770x578.jpg",
  },
];
</script>

<template>
  <section class="py-16 bg-amber-50">
    <div class="container mx-auto px-4">
      <h2 class="font-bold text-3xl text-amber-900 mb-8">Próximos Eventos</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          v-for="event in upcomingEvents"
          :key="event.id"
          class="bg-white rounded-lg overflow-hidden shadow-md flex flex-col md:flex-row"
        >
          <div
            class="
            relative 
            w-full h-48 
            md:w-2/5 md:h-auto"
          >
            <img
              :src="event.image"
              :alt="event.name"
              class="object-cover w-full h-full"
            />
          </div>
          <div class="p-6 md:w-3/5">
            <h3 class="text-xl font-semibold text-amber-800 mb-1">
              {{ event.title }}
            </h3>
            <p class="text-amber-600 mb-3">{{ event.date }}</p>
            <p class="text-amber-700 mb-4">{{ event.description }}</p>
            <router-link
              to="/contact"
              class="text-amber-600 font-medium hover:text-amber-800 transition-colors"
            >
              Más información →
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
