<template>
  <div class="space-y-8">
    <section class="bg-amber-50 p-6 rounded-lg">
      <h3 class="text-xl font-semibold text-amber-800 mb-2">
        Información Importante
      </h3>
      <ul class="list-disc list-inside text-amber-700 space-y-1">
        <li>Todos nuestros productos se elaboran diariamente.</li>
        <li>Infórmenos si tiene alguna alergia o intolerancia alimentaria.</li>
        <li>Precios incluyen IVA.</li>
        <li>Disponibilidad sujeta a existencias del día.</li>
      </ul>
    </section>
  </div>
</template>

<script setup>
defineProps({
  cartCount: {
    type: Number,
    default: 0,
  },
});
</script>
