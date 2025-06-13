<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const error = ref("");

const passwordsMatch = computed(() => {
  return form.value.password === form.value.confirmPassword;
});

const handleRegister = async () => {
  try {
    error.value = "";

    if (!passwordsMatch.value) {
      error.value = "Las contraseñas no coinciden";
      return;
    }

    const userData = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
    };

    await authStore.register(userData);

    // Redirigir según el rol asignado
    const role = authStore.userRole;
    if (role === "admin") {
      router.push("/admin");
    } else if (role === "moderator") {
      router.push("/moderator");
    } else {
      router.push("/");
    }
  } catch (err) {
    console.log(err);
    error.value = err.response?.data?.message || "Error al registrarse";
  }
};
</script>

<template>
  <div class="min-h-screen bg-amber-50 flex items-center justify-center p-4">
    <div
      class="register-form max-w-md w-full p-8 bg-white rounded-xl shadow-lg"
    >
      <form @submit.prevent="handleRegister">
        <h2 class="text-3xl font-bold mb-8 text-center text-amber-800">
          Registrarse
        </h2>

        <!-- Campos del formulario -->
        <div class="form-group mb-4">
          <label for="name" class="block mb-2 font-medium text-gray-700"
            >Nombre:</label
          >
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        <div class="form-group mb-4">
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

        <div class="form-group mb-4">
          <label for="password" class="block mb-2 font-medium text-gray-700"
            >Contraseña:</label
          >
          <input
            id="password"
            v-model="form.password"
            type="password"
            required
            minlength="6"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <div class="form-group mb-4">
          <label
            for="confirmPassword"
            class="block mb-2 font-medium text-gray-700"
            >Confirmar Contraseña:</label
          >
          <input
            id="confirmPassword"
            v-model="form.confirmPassword"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          :disabled="authStore.loading || !passwordsMatch"
          class="w-full py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {{ authStore.loading ? "Registrando..." : "Registrarse" }}
        </button>

        <div v-if="error" class="error text-red-600 mt-4 text-center text-sm">
          {{ error }}
        </div>

        <div
          v-if="!passwordsMatch && form.confirmPassword"
          class="error text-red-600 mt-2 text-center text-sm"
        >
          Las contraseñas no coinciden
        </div>

        <p class="login-link text-center mt-6 text-sm">
          ¿Ya tienes cuenta?
          <router-link to="/login" class="text-blue-600 hover:underline"
            >Inicia sesión aquí</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>
