<template>
  
  <div v-if="loading" class="container mx-auto px-4 py-8 text-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
    <p class="mt-4 text-amber-700">Cargando productos...</p>
  </div>

  
  <div v-else-if="error" class="container mx-auto px-4 py-8">
    <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <p class="text-red-600 mb-4">{{ error }}</p>
      <button 
        @click="$emit('retry')"
        class="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
      >
        Reintentar
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  }
})

defineEmits(['retry'])
</script>