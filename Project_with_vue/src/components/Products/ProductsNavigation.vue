<template>
  <nav class="container mx-auto px-4 py-8">
    <div class="flex flex-wrap justify-center gap-4">
      <button
        @click="$emit('quick-filter', '')"
        :class="[
          'px-4 py-2 rounded-md transition-colors',
          selectedCategory === ''
            ? 'bg-amber-600 text-white'
            : 'bg-amber-100 hover:bg-amber-200 text-amber-800',
        ]"
      >
        Todos
      </button>
      <button
        v-for="category in categories"
        :key="category._id"
        @click="$emit('quick-filter', category._id)"
        :class="[
          'px-4 py-2 rounded-md transition-colors',
          selectedCategory === category._id
            ? 'bg-amber-600 text-white'
            : 'bg-amber-100 hover:bg-amber-200 text-amber-800',
        ]"
      >
        {{ category.name }}
      </button>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
  selectedCategory: {
    type: String,
    default: "",
  },
});

defineEmits(["quick-filter"]);
</script>
