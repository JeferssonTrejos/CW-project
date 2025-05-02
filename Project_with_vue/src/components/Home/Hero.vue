<template>
  <section className="relative bg-amber-800/90  text-white w-full">
    <div class="absolute inset-0 z-0 overflow-hidden">
      <img
        src="../../assets/Fresh-bakery-goods-in-supermarket.jpg"
        alt="Fondo de panes artesanales"
        class="object-cover w-full h-full opacity-40"
      />
    </div>

    <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
      <div className="max-w-2xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Bienvenidos a Panadería El Rosario
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Disfruta del mejor pan recién horneado en el corazón de Intipuca.
          Nuestros productos, elaborados con ingredientes frescos y
          tradicionales, te brindarán el auténtico sabor del pan hecho con amor.
          Visítanos y vive una experiencia deliciosa en un ambiente acogedor y
          familiar.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <router-link
            to="/products"
            class="bg-amber-600 text-white hover:bg-amber-100 font-semibold py-2 px-6 rounded-md text-center"
            >Ver Productos</router-link
          >
          <router-link
            to="/order"
            class="bg-white text-amber-800 hover:bg-amber-100 font-semibold py-2 px-6 rounded-md text-center"
            >Hacer pedido</router-link
          >
        </div>
      </div>
    </div>
  </section>
</template>
