<script setup>
import ContactForm from "@/components/Contact/ContactForm.vue";
import ContactInfo from "@/components/Contact/ContactInfo.vue";
import ContactMap from "@/components/Contact/ContactMap.vue";
import ContactQuestion from "@/components/Contact/ContactQuestion.vue";
const FrequentlyQuestions = [
  {
    question: "¿Tienen opciones sin gluten?",
    answer:
      "Sí, ofrecemos una selección de panes y pasteles sin gluten elaborados en un área separada para evitar la contaminación cruzada. Consulta nuestra sección especial en la tienda.",
  },
  {
    question: "¿Organizan talleres de panadería?",
    answer:
      "Sí, regularmente organizamos talleres para principiantes y avanzados. Aprende a hacer pan de masa madre, bollería o repostería. Consulta nuestro calendario de eventos.",
  },
  {
    question: "¿Tienen servicio a domicilio?",
    answer:
      "Ofrecemos servicio a domicilio en toda la ciudad. Puedes hacer tu pedido por teléfono o a través de nuestra página web con al menos 24 horas de anticipación.",
  },
  {
    question: "¿Cuál es la especialidad de la casa?",
    answer:
      "Nuestro pan de masa madre es nuestra especialidad, fermentado durante 24 horas para desarrollar un sabor único y una miga perfecta. También son muy populares nuestros croissants artesanales.",
  },
];
</script>

<template>
  <section class="relative bg-amber-700 text-white py-16">
    <div class="absolute inset-0 z-0 overflow-hidden">
      <img
        src="https://www.kehe.com/wp-content/uploads/2024/07/Untitled-design-1-1.jpg"
        alt="Fondo de panes artesanales"
        class="object-cover w-full h-full opacity-40"
      />
    </div>
    <div
      class="container mx-auto relative z-10 flex flex-col justify-center items-center"
    >
      <div class="max-w-2xl text-center">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
        <p class="text-lg max-w-2xl mx-auto">
          Estamos aquí para atenderte. Comunícate con nosotros para cualquier
          consulta sobre nuestros productos, talleres de panadería o información
          general.
        </p>
      </div>
    </div>
  </section>

  <!-- Contenido de Contacto -->
  <div class="container mx-auto px-4 py-16">
    <div class="bg-amber-50 rounded-xl shadow-lg overflow-hidden">
      <div class="grid grid-cols-1 md:grid-cols-2">
        <ContactInfo />
        <ContactForm />
      </div>
    </div>

    <div class="mt-16">
      <ContactMap />
    </div>

    <div class="mt-16">
      <h2 class="text-3xl font-bold text-amber-800 mb-8 relative inline-block">
        Preguntas Frecuentes
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ContactQuestion
          v-for="FrequentlyQuestion in FrequentlyQuestions"
          :answer="FrequentlyQuestion.answer"
          :question="FrequentlyQuestion.question"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
