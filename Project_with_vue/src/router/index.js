import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../stores/auth";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";

import Home from "../views/Home.vue";
import Products from "../views/Products.vue";
import Order from "../views/Order.vue";
import Contact from "../views/Contact.vue";
import NotFound from "../views/NotFound.vue";
import Profile from "@/views/Profile.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { hideLayout: true },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { hideLayout: true },
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
  },
  {
    path: "/contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/order",
    name: "Order",
    component: Order,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
    meta: { requiresAuth: true },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  routes,
});

// Guard de navegación
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  // Verificar autenticación solo una vez al cargar la app
  if (!authStore.user && !authStore.isAuthenticated) {
    await authStore.checkAuth();
  }

  // Verificar si requiere autenticación
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next("/login");
    return;
  }

  // Verificar roles si están definidos
  if (to.meta.roles && authStore.isAuthenticated) {
    const userRole = authStore.userRole;
    if (!userRole || !to.meta.roles.includes(userRole)) {
      // alert("Acceso no autorizado, rol insuficiente");
      next({ name: "NotFound" });
      return;
    }
  }

  next();
});

export default router;
