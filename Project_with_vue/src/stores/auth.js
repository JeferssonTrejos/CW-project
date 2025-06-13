import { defineStore } from "pinia";
import authService from "../services/auth";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
  }),

  getters: {
    // Getter simple para obtener el rol del usuario
    userRole: (state) => state.user?.role || null,

    // Helpers para verificar roles específicos
    isAdmin: (state) => state.user?.role === "admin",
    isUser: (state) => state.user?.role === "user",
    isModerator: (state) => state.user?.role === "moderator",
  },

  actions: {
    async login(credentials) {
      try {
        this.loading = true;
        const response = await authService.login(credentials);
        this.user = response.user;
        this.isAuthenticated = true;
        return response;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await authService.logout();
        this.user = null;
        this.isAuthenticated = false;
      } catch (error) {
        console.error("Error al cerrar sesión:", error);
      }
    },
    async register(userData) {
      try {
        this.loading = true;
        const response = await authService.register(userData);
        this.user = response.user;
        this.isAuthenticated = true;
        return response;
      } catch (error) {
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async checkAuth() {
      try {
        const response = await authService.verifyToken();
        this.user = response.user;
        this.isAuthenticated = true;
      } catch (error) {
        this.user = null;
        this.isAuthenticated = false;
      }
    },

    // Método simple para verificar si el usuario tiene un rol específico
    hasRole(role) {
      return this.user?.role === role;
    },

    // Método para verificar si el usuario tiene uno de varios roles
    hasAnyRole(roles) {
      return roles.includes(this.user?.role);
    },
  },
});
