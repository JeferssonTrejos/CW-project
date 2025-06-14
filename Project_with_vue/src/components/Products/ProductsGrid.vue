<template>
  <div>
   
    <section v-if="products.length > 0">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="product in products"
          :key="product._id"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          
          <div class="relative h-48 bg-gray-200">
            <img
              :src="product.image || 'https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL'"
              :alt="product.name"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
            
            
            <div
              v-if="product.isHighlighted"
              class="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-md text-xs font-semibold"
            >
              Destacado
            </div>
            
            
            <div
              v-if="!product.isAvailable"
              class="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold"
            >
              Agotado
            </div>
          </div>

          
          <div class="p-4">
        
            <div v-if="product.category" class="mb-2">
              <span class="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded-full">
                {{ getCategoryName(product.category) }}
              </span>
            </div>

            
            <h3 class="text-lg font-semibold text-gray-800 mb-2">
              {{ product.name }}
            </h3>

            
            <p class="text-gray-600 text-sm mb-3 h-12 overflow-hidden">
              {{ product.description }}
            </p>

            
            <div class="flex items-center justify-between">
              <span class="text-xl font-bold text-amber-600">
                {{ formatPrice(product.price) }}
              </span>

              <button
                v-if="product.isAvailable"
                @click="$emit('add-to-cart', product)"
                class="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 transition-colors flex items-center space-x-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5-2.5M7 13l2.5 2.5"></path>
                </svg>
                <span>Agregar</span>
              </button>

              <span
                v-else
                class="text-gray-500 text-sm"
              >
                No disponible
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    
    <section v-else class="text-center py-12">
      <div class="bg-gray-50 rounded-lg p-8">
        <h3 class="text-xl font-semibold text-gray-600 mb-2">No se encontraron productos</h3>
        <p class="text-gray-500 mb-4">
          Intenta ajustar los filtros o buscar con diferentes términos.
        </p>
        <button 
          @click="$emit('clear-filters')"
          class="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          Ver todos los productos
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    default: () => []
  }
})

defineEmits(['add-to-cart', 'clear-filters'])


const formatPrice = (price) => {
  if (!price) return 'Precio no disponible'
  
  if (typeof price === 'string' && price.includes('$')) {
    return price
  }
  
  if (typeof price === 'number') {
    return `$${price.toFixed(2)}`
  }
  
  return `$${parseFloat(price).toFixed(2)}`
}

const getCategoryName = (category) => {
  if (!category) return 'Sin categoría'
  
  if (typeof category === 'object' && category.name) {
    return category.name
  }
  
  return category
}


const handleImageError = (event) => {
  event.target.src = 'https://avatars.mds.yandex.net/get-altay/13451497/2a0000018ed9af680cbea3c965bebbc1a280/XXXL'
}
</script>