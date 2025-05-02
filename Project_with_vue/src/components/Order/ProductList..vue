<script setup>
import ProductCategory from "./ProductCategory.vue";
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
  <div>
    <h3 class="text-xl font-semibold text-amber-800 mb-4">Productos</h3>
    <p class="text-amber-700 mb-4">
      Selecciona los productos que deseas ordenar:
    </p>

    <ProductCategory :form-data="formData" :products="products" />

    <!-- Pedido personalizado -->
    <div class="mt-6">
      <h4
        class="font-medium text-amber-800 mb-3 pb-1 border-b border-amber-200"
      >
        Pedido Personalizado
      </h4>
      <textarea
        v-model="formData.customOrder"
        id="custom-order"
        name="custom-order"
        rows="3"
        placeholder="Describe cualquier producto adicional o personalización que necesites..."
        class="w-full max-h-80 px-4 py-3 rounded-lg outline-none border-2 border-amber-200 focus:border-amber-500 transition"
      ></textarea>
    </div>
  </div>
</template>
