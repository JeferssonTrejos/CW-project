<script setup>
import Branding from "./components/Branding.vue";
import NavBar from "./components/NavBar.vue";
</script>

<template>
  <header class="bg-amber-50 shadow">
    <div class="container mx-auto flex items-center justify-between px-4 py-4">
      <Branding />
      <NavBar />
    </div>
  </header>

  <main class=" mx-auto flex items-center justify-between">
    <router-view />
  </main>
  
</template>
