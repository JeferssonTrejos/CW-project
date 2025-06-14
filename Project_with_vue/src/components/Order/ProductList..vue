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

const calculateTotal = (products) => {
  if (!products) return 0;
  return products.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
};

const formatPrice = (price) => {
  return Number(price).toFixed(2);
};
</script>

<template>
  <div>
    <h3 class="text-xl font-semibold text-amber-800 mb-4">Productos</h3>
    <p class="text-amber-700 mb-4">
      Selecciona los productos que deseas ordenar:
    </p>

    <!-- <ProductCategory :form-data="formData" :products="products" /> -->
    <div
      v-for="item in products"
      :key="item.product._id"
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border-b border-amber-100"
    >
      <div class="flex items-center gap-4 mb-2 sm:mb-0">
        <div>
          <h3 class="font-medium text-amber-800">
            {{ item.product.name }}
          </h3>
          <p class="text-amber-600 text-sm">
            {{ item.product.category?.name || "Producto" }}
          </p>
          <p class="font-bold text-amber-900">
            ${{ formatPrice(item.product.price) }}
          </p>
        </div>
      </div>

      <div class="flex items-center gap-4">
        <div class="flex items-center border border-amber-200 rounded">
          <span class="text-center w-16">{{ item.quantity }}</span>
        </div>

        <div class="text-right min-w-[80px]">
          <p class="font-bold text-amber-900">
            ${{ formatPrice(item.quantity * item.product.price) }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-between py-2 border-b border-amber-200">
      <span class="text-amber-700">Subtotal</span>
      <span class="font-medium"
        >${{ formatPrice(calculateTotal(products)) }}</span
      >
    </div>
    <!-- Pedido personalizado -->
    <!-- <div class="mt-6">
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
    </div> -->
  </div>
</template>
