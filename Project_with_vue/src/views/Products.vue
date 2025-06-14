<script setup>
import { ref, onMounted, computed, watch } from "vue";
import api from "@/services/api.js";
import ProductsBanner from "@/components/Products/ProductsBanner.vue";

import ProductsNavigation from "@/components/Products/ProductsNavigation.vue";
import ProductsStates from "@/components/Products/ProductsStates.vue";
import ProductsGrid from "@/components/Products/ProductsGrid.vue";
import ProductsInfo from "@/components/Products/ProductsInfo.vue";
import ProductsNotification from "@/components/Products/ProductsNotification.vue";
import ProductService from "../services/Product";

const products = ref([]);
const categories = ref([]);
const loading = ref(true);
const error = ref(null);
const selectedCategory = ref("");

// Notificaciones
const showCartNotification = ref(false);
const cartNotificationMessage = ref("");

// Computed para productos filtrados
const filteredProducts = computed(() => {
  let filtered = [...products.value];

  // Filtrar por categoría
  if (selectedCategory.value) {
    filtered = filtered.filter((product) => {
      if (!product.category) return false;
      const categoryId =
        typeof product.category === "object"
          ? product.category._id
          : product.category;
      return categoryId === selectedCategory.value;
    });
  }

  return filtered;
});

// Extraer categorías únicas
const extractCategories = () => {
  const categoryMap = new Map();

  products.value.forEach((product) => {
    if (product.category) {
      const category =
        typeof product.category === "object"
          ? product.category
          : { _id: product.category, name: product.category };

      categoryMap.set(category._id, category);
    }
  });

  categories.value = Array.from(categoryMap.values());
};

// Obtener productos
const fetchProducts = async () => {
  try {
    loading.value = true;
    error.value = null;

    const response = await ProductService.getAllProducts();
    products.value = response || [];
    extractCategories();
  } catch (err) {
    error.value =
      err.response?.data?.message || "Error al cargar los productos";
    console.error("Error fetching products:", err);
  } finally {
    loading.value = false;
  }
};

// Obtener productos por categoría
const fetchProductsByCategory = async (categoryId) => {
  try {
    loading.value = true;
    error.value = null;

    const response = await ProductService.getProductsByCategory(categoryId);
    products.value = response || [];
  } catch (err) {
    error.value =
      err.response?.data?.message ||
      "Error al cargar productos de la categoría";
    console.error("Error fetching products by category:", err);
  } finally {
    loading.value = false;
  }
};

// Mostrar notificación
const showNotification = (message) => {
  cartNotificationMessage.value = message;
  showCartNotification.value = true;
  setTimeout(() => {
    showCartNotification.value = false;
  }, 3000);
};

// Agregar al carrito
const addToCart = async (product) => {
  if (!product.isAvailable) {
    showNotification("Este producto no está disponible");
    return;
  }

  try {
    await api.post("/shoppingcart/add", {
      productId: product._id,
      quantity: 1,
    });
    showNotification(`${product.name} agregado al carrito`);
  } catch (error) {
    const errorMessages = {
      401: "Debes iniciar sesión para agregar productos al carrito",
      400: "Producto no disponible",
    };

    const message =
      errorMessages[error.response?.status] || "Error al agregar al carrito";
    showNotification(message);
    console.error("Error adding to cart:", error);
  }
};

// // Manejadores de eventos
// const handleCategoryChange = (value) => {
//   selectedCategory.value = value;
// };

const quickFilter = (categoryId) => {
  if (categoryId) {
    fetchProductsByCategory(categoryId);
  } else {
    fetchProducts();
  }
};

const clearFilters = () => {
  selectedCategory.value = "";
  fetchProducts();
};

// // Watchers para reactividad
// watch(selectedCategory, () => {
//   // Los computed se actualizan automáticamente
// });

// Inicialización
onMounted(() => {
  fetchProducts();
});
</script>

<template>
  <div class="bg-amber-50">
    <ProductsBanner />

    <ProductsNavigation
      :categories="categories"
      :selected-category="selectedCategory"
      @quick-filter="quickFilter"
    />

    <ProductsStates :loading="loading" :error="error" @retry="fetchProducts" />

    <main v-if="!loading && !error" class="container mx-auto px-4 py-8">
      <ProductsGrid
        :products="filteredProducts"
        @add-to-cart="addToCart"
        @clear-filters="clearFilters"
      />

      <ProductsInfo :cart-count="0" />
    </main>

    <ProductsNotification
      :show="showCartNotification"
      :message="cartNotificationMessage"
    />
  </div>
</template>
