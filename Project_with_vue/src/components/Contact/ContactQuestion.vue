<script>
export default {
  props: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <div
    class="bg-white p-6 rounded-xl shadow border-l-4 border-amber-500 hover:shadow-md transition-shadow"
  >
    <h3 class="text-xl font-bold text-amber-800 mb-2">
      {{ question }}
    </h3>
    <p class="text-amber-700">
      {{ answer }}
    </p>
  </div>
</template>
