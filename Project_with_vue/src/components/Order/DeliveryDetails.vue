<script setup>
defineProps({
  formData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div>
    <h3 class="text-xl font-semibold text-amber-800 mb-4">
      Detalles de Entrega
    </h3>
    <div class="mb-4">
      <label class="block text-amber-800 font-medium mb-3">
        Método de Entrega <span class="text-red-500">*</span>
      </label>
      <div class="flex flex-col space-y-2">
        <div class="flex items-center">
          <input
            v-model="formData.deliveryMethod"
            type="radio"
            id="pickup"
            name="delivery-method"
            value="pickup"
            class="mr-3 h-5 w-5 text-amber-600"
            checked
          />
          <label for="pickup" class="text-amber-800 flex items-center">
            Recoger en tienda
          </label>
        </div>
        <div class="flex items-center">
          <input
            v-model="formData.deliveryMethod"
            type="radio"
            id="delivery"
            name="delivery-method"
            value="delivery"
            class="mr-3 h-5 w-5 text-amber-600"
          />
          <label for="delivery" class="text-amber-800 flex items-center">
            Entrega a domicilio (+$3.00)
          </label>
        </div>
      </div>
    </div>

    <div class="bg-amber-50 p-4 rounded-lg border border-amber-200">
      <h4 class="font-medium text-amber-800 mb-3">Dirección de Entrega</h4>
      <p class="text-amber-700 text-sm mb-3">
        Complete solo si seleccionó entrega a domicilio
      </p>

      <div class="space-y-4">
        <div>
          <label for="address" class="block text-amber-800 font-medium mb-2">
            Dirección Completa
          </label>
          <input
            v-model="formData.address"
            type="text"
            id="address"
            name="address"
            placeholder="Calle, número, colonia..."
            class="w-full px-4 py-3 rounded-lg outline-none border-2 border-amber-200 focus:border-amber-500 transition"
          />
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="city" class="block text-amber-800 font-medium mb-2">
              Ciudad
            </label>
            <input
              v-model="formData.city"
              type="text"
              id="city"
              name="city"
              class="w-full px-4 py-3 rounded-lg outline-none border-2 border-amber-200 focus:border-amber-500 transition"
            />
          </div>
          <div>
            <label for="zip" class="block text-amber-800 font-medium mb-2">
              Código Postal
            </label>
            <input
              v-model="formData.zip"
              type="text"
              id="zip"
              name="zip"
              class="w-full px-4 py-3 rounded-lg outline-none border-2 border-amber-200 focus:border-amber-500 transition"
            />
          </div>
        </div>
        <div>
          <label
            for="delivery-instructions"
            class="block text-amber-800 font-medium mb-2"
          >
            Instrucciones de Entrega (opcional)
          </label>
          <textarea
            v-model="formData.deliveryInstructions"
            id="delivery-instructions"
            name="delivery-instructions"
            rows="2"
            placeholder="Indicaciones adicionales para el repartidor..."
            class="w-full max-h-80 px-4 py-3 rounded-lg outline-none border-2 border-amber-200 focus:border-amber-500 transition"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
