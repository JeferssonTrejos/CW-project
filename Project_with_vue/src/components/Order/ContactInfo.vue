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
        <label for="name" class="block text-amber-800 font-medium mb-2">
          Nombre Completo <span class="text-red-500">*</span>
        </label>
        <input
          v-model="formData.name"
          type="text"
          id="name"
          name="name"
          required
          placeholder="Tu nombre"
          class="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
        />
      </div>
      <div>
        <label for="email" class="block text-amber-800 font-medium mb-2">
          Correo Electrónico <span class="text-red-500">*</span>
        </label>
        <input
          v-model="formData.email"
          type="email"
          id="email"
          name="email"
          required
          placeholder="tucorreo@ejemplo.com"
          class="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
        />
      </div>
    </div>
    <div class="mt-6">
      <label for="phone" class="block text-amber-800 font-medium mb-2">
        Teléfono <span class="text-red-500">*</span>
      </label>
      <input
        v-model="formData.phone"
        type="tel"
        id="phone"
        name="phone"
        required
        placeholder="Tu número de teléfono"
        class="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
      />
    </div>
  </div>
</template>
