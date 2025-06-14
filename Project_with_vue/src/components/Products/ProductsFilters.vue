<template>
  <section class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-md p-6 mb-8">
      <h2 class="text-xl font-semibold text-amber-800 mb-4">Filtrar Productos</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Mostrar</label>
          <select 
            :value="selectedFilter" 
            @change="$emit('filter-change', $event.target.value)" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="all">Todos los productos</option>
            <option value="available">Solo disponibles</option>
            <option value="highlighted">Productos destacados</option>
          </select>
        </div>

        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Buscar</label>
          <input 
            :value="searchTerm" 
            @input="$emit('search-change', $event.target.value)"
            type="text" 
            placeholder="Buscar productos..."
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
        </div>

        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Categoría</label>
          <select 
            :value="selectedCategory" 
            @change="$emit('category-change', $event.target.value)" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Todas las categorías</option>
            <option v-for="category in categories" :key="category._id" :value="category._id">
              {{ category.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="flex justify-between items-center mt-4">
        <button 
          @click="$emit('clear-filters')"
          class="px-4 py-2 text-amber-600 hover:text-amber-800 transition-colors"
        >
          Limpiar filtros
        </button>
        <span class="text-sm text-gray-600">
          {{ productCount }} producto{{ productCount !== 1 ? 's' : '' }} encontrado{{ productCount !== 1 ? 's' : '' }}
        </span>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  selectedFilter: {
    type: String,
    default: 'available'  
  },
  searchTerm: {
    type: String,
    default: ''
  },
  selectedCategory: {
    type: String,
    default: ''
  },
  categories: {
    type: Array,
    default: () => []
  },
  productCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['filter-change', 'search-change', 'category-change', 'clear-filters'])
</script>