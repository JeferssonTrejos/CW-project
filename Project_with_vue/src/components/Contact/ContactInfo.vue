<script setup>
import { PhoneIcon, MapPin, Mail, Clock } from "lucide-vue-next";
</script>

<template>
  <div class="p-8 bg-amber-100">
    <h2 class="text-3xl font-bold text-amber-800 mb-8 relative">
      Información de Contacto
    </h2>

    <div class="space-y-8 mt-10">
      <div class="flex items-start">
        <div class="bg-amber-600 p-3 rounded-full text-white mr-4">
          <MapPin />
        </div>
        <div>
          <h4 class="font-bold text-amber-800 mb-1 text-lg">Dirección</h4>
          <p class="text-amber-700">
            Calle Principal 123,
            <br />
            San miguel, El Salvador
          </p>
        </div>
      </div>

      <div class="flex items-start">
        <div class="bg-amber-600 p-3 rounded-full text-white mr-4">
          <PhoneIcon />
        </div>
        <div>
          <h4 class="font-bold text-amber-800 mb-1 text-lg">Teléfono</h4>
          <p class="text-amber-700">+503 2222-1111</p>
          <p class="text-amber-700">+503 7777-8888 (WhatsApp)</p>
        </div>
      </div>

      <div class="flex items-start">
        <div class="bg-amber-600 p-3 rounded-full text-white mr-4">
          <Mail />
        </div>
        <div>
          <h4 class="font-bold text-amber-800 mb-1 text-lg">
            Correo Electrónico
          </h4>
          <p class="text-amber-700">panaderiarosario@gmail.com</p>
        </div>
      </div>

      <div class="flex items-start">
        <div class="bg-amber-600 p-3 rounded-full text-white mr-4">
          <Clock />
        </div>
        <div>
          <h4 class="font-bold text-amber-800 mb-1 text-lg">
            Horario de Atención
          </h4>
          <ul class="text-amber-700">
            <li>
              <span class="font-medium">Lunes - Viernes:</span> 6:00 - 20:00
            </li>
            <li><span class="font-medium">Sábado:</span> 7:00 - 19:00</li>
            <li><span class="font-medium">Domingo:</span> 8:00 - 14:00</li>
          </ul>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <router-link
        to="/order"
        class="inline-flex items-center bg-amber-600 text-white py-3 px-6 rounded-lg hover:bg-amber-700 transition-colors"
      >
        <i class="fas fa-comment-dots mr-2"></i>
        Hacer un Pedido
      </router-link>
    </div>
  </div>
</template>
