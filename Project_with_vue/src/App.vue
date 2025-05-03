<script setup>
import Branding from "./components/Branding.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <Header></Header>

  <main class="min-h-[700px]">
    <router-view />
  </main>

  <Footer></Footer>
</template>
