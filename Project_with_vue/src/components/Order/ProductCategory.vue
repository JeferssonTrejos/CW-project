<script setup>
import ProductItem from "./ProductItem.vue";

defineProps({
  products: {
    type: Array,
    required: true,
  },
  formData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    v-for="productCategory in products"
    :key="productCategory.category"
    class="mb-6"
  >
    <h4 class="font-medium text-amber-800 mb-3 pb-1 border-b border-amber-200">
      {{ productCategory.category }}
    </h4>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ProductItem :form-data="formData" :items="productCategory.items" />
    </div>
  </div>
</template>
