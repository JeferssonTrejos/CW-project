<template>
    <section class="mb-16">
      <!-- Título con barra decorativa -->
      <div class="relative">
        <h2 class="text-2xl font-bold text-[#8B4513] mb-2">{{ title }}</h2>
        <div class="w-full h-[2px] bg-[#FFA500]"></div>
      </div>
  
      <!-- Grid de productos -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <div 
          v-for="item in items" 
          :key="item.id"
          class="flex items-start gap-6 bg-white rounded-lg shadow-sm p-6"
        >
          <img 
            :src="item.image" 
            :alt="item.name"
            class="w-24 h-24 object-cover"
          />
          <div class="flex-grow">
            <div class="flex items-center gap-4 mb-2">
              <h3 class="text-lg font-semibold text-[#8B4513]">{{ item.name }}</h3>
              <div class="flex-grow border-b border-dotted border-amber-300"></div>
              <span class="text-lg font-bold text-[#FF6B00]">${{ item.price }}</span>
            </div>
            <p class="text-[#8B4513]">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  })
  </script>