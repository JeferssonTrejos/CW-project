<script setup>
import AddToCartButton from '../Cart/AddToCartButton.vue';
import { onMounted } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
  formData: {
    type: Object,
    required: true,
  },
});

// Inicializar la cantidad para cada producto
onMounted(() => {
  props.items.forEach(product => {
    if (!product.quantity) {
      product.quantity = 1;
    }
  });
});
</script>

<template>  <div
    v-for="product in items"
    :key="product.id"
    class="flex flex-col bg-amber-50 p-3 rounded-lg"
  >
    <div class="flex items-center justify-between">
      <div class="flex items-center">
        <input
          type="checkbox"
          :id="product.id"
          :value="product"
          v-model="formData.selectedProducts"
          class="mr-3 h-5 w-5 text-amber-600 rounded focus:ring-amber-500"
        />
        <label :for="product.id" class="text-amber-800">
          {{ product.name }}
          <span class="block text-xs text-amber-600">
            ${{ product.price.toFixed(2) }} / {{ product.unit }}
          </span>
        </label>
      </div>    <div class="w-20">
        <div class="flex">
          <input
            type="number"
            min="1"
            v-model="product.quantity"
            class="w-full px-2 py-1 text-center border border-amber-200 rounded"
            :aria-label="'Cantidad de ' + product.name"
          />
        </div>
      </div>
    </div>
      <!-- Botón Agregar al carrito -->    <div class="mt-2 ml-8">
      <AddToCartButton :productId="product.id.toString()" :quantity="product.quantity" />
    </div>
  </div>
</template>
