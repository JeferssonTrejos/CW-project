<template>
  <div class="bg-amber-50">
     <!-- Banner principal -->
  <section class="relative bg-amber-800 text-white py-12">
    <div class="absolute inset-0 z-0 opacity-40">
      <img src="https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL" alt="Fondo de panadería" class="object-cover w-full h-full" />
    </div>
    <div class="container mx-auto px-4 relative z-10 text-center">
      <h1 class="text-4xl md:text-5xl font-bold mb-4">Nuestros Productos</h1>
      <p class="text-lg max-w-2xl mx-auto">
        Descubre nuestra selección de panes artesanales, bollería, pasteles y más, elaborados diariamente con
        ingredientes de primera calidad y técnicas tradicionales.
      </p>
    </div>
  </section>

  <!-- Navegación rápida -->
  <nav class="container mx-auto px-4 py-8">
    <div class="flex flex-wrap justify-center gap-4">
      <a
        v-for="section in ['panes', 'bolleria', 'pasteles', 'bebidas']"
        :key="section"
        :href="'#' + section"
        class="bg-amber-100 hover:bg-amber-200 text-amber-800 px-4 py-2 rounded-md transition-colors"
      >
        {{ section.charAt(0).toUpperCase() + section.slice(1) }}
      </a>
    </div>
  </nav>

  <!-- Secciones del menú -->
  <main class=" container mx-auto px-4 py-8 space-y-12">
    <section id="panes">
      <MenuCategory title="Panes Artesanales" :items="menuData.panes" />
    </section>
    <section id="bolleria">
      <MenuCategory title="Bollería" :items="menuData.bolleria" />
    </section>
    <section id="pasteles">
      <MenuCategory title="Pasteles y Tartas" :items="menuData.pasteles" />
    </section>
    <section id="bebidas">
      <MenuCategory title="Bebidas" :items="menuData.bebidas" />
    </section>

    <!-- Información adicional -->
    <section class="bg-amber-50 p-6 rounded-lg">
      <h3 class="text-xl font-semibold text-amber-800 mb-2">Información Importante</h3>
      <ul class="list-disc list-inside text-amber-700 space-y-1">
        <li>Todos nuestros productos se elaboran diariamente.</li>
        <li>Infórmenos si tiene alguna alergia o intolerancia alimentaria.</li>
        <li>Precios incluyen IVA.</li>
        <li>Disponibilidad sujeta a existencias del día.</li>
      </ul>
    </section>

    <!-- Llamado a la acción -->
    <section class="text-center">
      <p class="text-amber-700 mb-4">¿Listo para probar nuestros deliciosos productos?</p>
      <router-link 
        to="/order" 
        class="inline-block bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
      >
        Hacer un Pedido
      </router-link>
    </section>
  </main>
  </div>
</template>

<script setup>

import MenuCategory from "@/components/Products/MenuCategory.vue"

const menuData = {
  panes: [
    {
      id: 1,
      name: "Pan de Masa Madre",
      description: "Pan rústico elaborado con masa madre natural y fermentación lenta de 24 horas.",
      price: "$4.50",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    },
    {
      id: 2,
      name: "Baguette Tradicional",
      description: "Crujiente por fuera, tierna por dentro. Elaborada con harina de trigo francesa.",
      price: "$3.25",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    },
    {
      id: 3,
      name: "Pan de Centeno",
      description: "Pan denso y nutritivo elaborado con harina de centeno y semillas.",
      price: "$4.75",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    },
    {
      id: 4,
      name: "Pan Integral Multigranos",
      description: "Elaborado con harinas integrales y una mezcla de semillas y granos.",
      price: "$5.50",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    }
  ],
  bolleria: [
    {
      id: 1,
      name: "Croissant de Mantequilla",
      description: "Clásico croissant francés elaborado con mantequilla de primera calidad.",
      price: "$2.50",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    },
    {
      id: 2,
      name: "Pain au Chocolat",
      description: "Hojaldre relleno de chocolate negro de alta calidad.",
      price: "$2.95",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    },
    {
      id: 3,
      name: "Caracola de Canela",
      description: "Suave masa de brioche con relleno de canela y azúcar, coronada con glaseado.",
      price: "$3.50",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    },
    {
      id: 4,
      name: "Napolitana de Crema",
      description: "Hojaldre relleno de crema pastelera casera.",
      price: "$3.25",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    }
  ],
  pasteles: [
    {
      id: 1,
      name: "Tarta de Manzana",
      description: "Tarta casera con manzanas frescas y canela sobre masa quebrada artesanal.",
      price: "$18.50",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    },
    {
      id: 2,
      name: "Cheesecake",
      description: "Cremoso cheesecake horneado con base de galleta y cobertura de frutos rojos.",
      price: "$22.75",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    },
    {
      id: 3,
      name: "Selva Negra",
      description: "Clásico pastel de chocolate con cerezas y nata montada.",
      price: "$24.25",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    },
    {
      id: 4,
      name: "Carrot Cake",
      description: "Pastel húmedo de zanahoria con nueces y frosting de queso crema.",
      price: "$20.95",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    }
  ],
  bebidas: [
    {
      id: 1,
      name: "Café Espresso",
      description: "Café de especialidad de tueste medio con notas a chocolate y frutos secos.",
      price: "$1.50",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    },
    {
      id: 2,
      name: "Cappuccino",
      description: "Espresso con leche vaporizada y espuma de leche.",
      price: "$2.75",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    },
    {
      id: 3,
      name: "Chocolate Caliente",
      description: "Elaborado con chocolate negro 70% y leche fresca.",
      price: "$3.25",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    },
    {
      id: 4,
      name: "Té Orgánico",
      description: "Selección de tés orgánicos de diferentes variedades.",
      price: "$2.25",
      image: "https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL"
    }
  ]
}
</script>
