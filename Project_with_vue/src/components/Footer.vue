<script setup>
import {
  Facebook,
  Instagram,
  MailIcon,
  MapIcon,
  MapPin,
  Phone,
  PhoneIcon,
  Twitter,
} from "lucide-vue-next";
</script>

<template>
  <footer className="bg-amber-800 text-amber-100">
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3
            className="text-xl font-semibold mb-4 border-b border-amber-700 pb-2"
          >
            Panadería El Rosario
          </h3>
          <p className="mb-4">
            Disfruta de nuestros panes y pasteles artesanales, elaborados con
            ingredientes de primera calidad y recetas tradicionales transmitidas
            por generaciones.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="hover:text-amber-300 transition-colors"
              aria-label="Facebook"
            >
              <Facebook />
            </a>
            <a
              href="#"
              className="hover:text-amber-300 transition-colors"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
            <a
              href="#"
              className="hover:text-amber-300 transition-colors"
              aria-label="Twitter"
            >
              <Twitter />
            </a>
          </div>
        </div>

        <div>
          <h3
            className="text-xl font-semibold mb-4 border-b border-amber-700 pb-2"
          >
            Contacto
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <MapPin class="mr-2 flex-shrink-0" />
              <span
                >Calle Principal 123, Barrio El Centro, Ciudad Panadero</span
              >
            </li>
            <li className="flex items-center">
              <Phone class="mr-2 flex-shrink-0" />
              <span>+503 2222-1111</span>
            </li>
            <li className="flex items-center">
              <MailIcon class="mr-3 flex-shrink-0" />
              <span>info@eltrigodorado.com</span>
            </li>
          </ul>
        </div>

        <div>
          <h3
            className="text-xl font-semibold mb-4 border-b border-amber-700 pb-2"
          >
            Horario
          </h3>
          <ul className="space-y-2">
            <li className="flex justify-between">
              <span>Lunes - Viernes:</span>
              <span>6:00 - 20:00</span>
            </li>
            <li className="flex justify-between">
              <span>Sábado:</span>
              <span>7:00 - 19:00</span>
            </li>
            <li className="flex justify-between">
              <span>Domingo:</span>
              <span>8:00 - 14:00</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-amber-700 text-center">
        <p>&copy; 2025 Panadería El Rosario. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>
