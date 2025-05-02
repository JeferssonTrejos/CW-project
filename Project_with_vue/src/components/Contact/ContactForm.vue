<script setup></script>

<template>
  <div class="p-8 bg-white">
    <h2 class="text-3xl font-bold text-amber-800 mb-8 relative">
      Envíanos un Mensaje
    </h2>

    <form class="space-y-6 mt-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label for="name" class="block text-amber-800 font-medium mb-2">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            class="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
            placeholder="Tu nombre"
          />
        </div>
        <div>
          <label for="email" class="block text-amber-800 font-medium mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            class="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
            placeholder="tucorreo@ejemplo.com"
          />
        </div>
      </div>

      <div>
        <label for="subject" class="block text-amber-800 font-medium mb-2">
          Asunto
        </label>
        <input
          type="text"
          id="subject"
          class="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
          placeholder="Asunto de tu mensaje"
        />
      </div>

      <div>
        <label for="message" class="block text-amber-800 font-medium mb-2">
          Mensaje
        </label>
        <textarea
          id="message"
          rows="5"
          class="w-full px-4 py-3 rounded-lg border border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition"
          placeholder="Escribe tu mensaje aquí..."
        ></textarea>
      </div>

      <button
        type="submit"
        class="w-full bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors font-medium text-lg"
      >
        Enviar Mensaje
      </button>
    </form>
  </div>
</template>
