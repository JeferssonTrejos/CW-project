<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Header></Header>

  <main class="min-h-[700px]">
    <router-view />
  </main>

  <Footer></Footer>
</template>
