<script setup>
defineProps({
  formData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <!-- Información de Contacto -->
  <div>
    <h3 class="text-xl font-semibold text-amber-800 mb-4">
      Información de Contacto
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-amber-800 font-medium mb-2">
          Nombre Completo
        </label>
        <div
          class="w-full px-4 py-3 rounded-lg border border-amber-200 bg-gray-100 text-amber-800"
        >
          {{ formData.name }}
        </div>
      </div>
      <div>
        <label for="email" class="block text-amber-800 font-medium mb-2">
          Correo Electrónico
        </label>
        <div
          class="w-full px-4 py-3 rounded-lg border border-amber-200 bg-gray-100 text-amber-800"
        >
          {{ formData.email }}
        </div>
      </div>
    </div>
    <div class="mt-6">
      <label for="phone" class="block text-amber-800 font-medium mb-2">
        Teléfono <span class="text-red-500">*</span>
      </label>
      <input
        v-model="formData.phone"
        type="number"
        id="phone"
        name="phone"
        required
        placeholder="Tu número de teléfono"
        class="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
      />
    </div>
  </div>
</template>
