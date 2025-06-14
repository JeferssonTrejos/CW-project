<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  email: "",
  password: "",
});

const error = ref("");

const handleLogin = async () => {
  try {
    error.value = "";
    await authStore.login(form.value);
    router.push("/");
  } catch (err) {
    error.value = err.response?.data?.message || "Error al iniciar sesión";
  }
};
</script>

<template>
  <div class="min-h-screen bg-amber-50 flex items-center justify-center p-4">
    <div class="max-w-md w-full p-8 bg-white rounded-xl shadow-lg">
      <form @submit.prevent="handleLogin">
        <h2 class="text-3xl font-bold mb-8 text-center text-amber-800">
          Iniciar Sesión
        </h2>

        <div class="mb-4">
          <label for="email" class="block mb-2 font-medium text-gray-700"
            >Email:</label
          >
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block mb-2 font-medium text-gray-700"
            >Contraseña:</label
          >
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          :disabled="authStore.loading"
          class="w-full py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {{ authStore.loading ? "Cargando..." : "Iniciar Sesión" }}
        </button>

        <div v-if="error" class="text-red-600 mt-4 text-center">
          {{ error }}
        </div>
        <p class="register-link text-center mt-6 text-sm">
          ¿No tienes cuenta?
          <router-link to="/register" class="text-blue-600 hover:underline">
            Regístrate aquí
          </router-link>
        </p>
      </form>
    </div>
  </div>
</template>
