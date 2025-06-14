<template>
  <div class="bg-amber-50">
    
    <ProductsBanner />

    
    <ProductsFilters
      :selected-filter="selectedFilter"
      :search-term="searchTerm"
      :selected-category="selectedCategory"
      :categories="categories"
      :product-count="filteredProducts.length"
      @filter-change="handleFilterChange"
      @search-change="handleSearchChange"
      @category-change="handleCategoryChange"
      @clear-filters="clearFilters"
    />

    
    <ProductsNavigation
      :categories="categories"
      :selected-category="selectedCategory"
      @quick-filter="quickFilter"
    />

    
    <ProductsStates
      :loading="loading"
      :error="error"
      @retry="fetchProducts"
    />

    
    <main v-if="!loading && !error" class="container mx-auto px-4 py-8">
      <ProductsGrid
        :products="filteredProducts"
        @add-to-cart="addToCart"
        @clear-filters="clearFilters"
      />

      
      <ProductsInfo :cart-count="cartCount" />
    </main>

    
    <ProductsNotification
      :show="showCartNotification"
      :message="cartNotificationMessage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import api from '@/services/api.js'
import ProductsBanner from '@/components/Products/ProductsBanner.vue'
import ProductsFilters from '@/components/Products/ProductsFilters.vue'
import ProductsNavigation from '@/components/Products/ProductsNavigation.vue'
import ProductsStates from '@/components/Products/ProductsStates.vue'
import ProductsGrid from '@/components/Products/ProductsGrid.vue'
import ProductsInfo from '@/components/Products/ProductsInfo.vue'
import ProductsNotification from '@/components/Products/ProductsNotification.vue'


const products = ref([])
const filteredProducts = ref([])
const categories = ref([])
const loading = ref(true)
const error = ref(null)

// Filtros
const selectedFilter = ref('available') 
const selectedCategory = ref('')
const searchTerm = ref('')

const cartCount = ref(0) 
const showCartNotification = ref(false)
const cartNotificationMessage = ref('')


const fetchProducts = async () => {
  try {
    loading.value = true
    error.value = null
    
    let endpoint = '/products'
    
    
    if (selectedFilter.value === 'all') {
      endpoint = '/products/all'  
    } else if (selectedFilter.value === 'available') {
      endpoint = '/products'      
    } else if (selectedFilter.value === 'highlighted') {
      endpoint = '/products/highlighted'  
    }
    
    const response = await api.get(endpoint)
    products.value = response.data
    extractCategories()
    filterProducts()
    
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al cargar los productos'
    console.error('Error fetching products:', err)
  } finally {
    loading.value = false
  }
}

const fetchProductsByCategory = async (categoryId) => {
  if (!categoryId) {
    fetchProducts()
    return
  }

  try {
    loading.value = true
    error.value = null
    
    
    const response = await api.get(`/products/category/${categoryId}`)
    let data = response.data
    
    
    if (selectedFilter.value === 'available') {
      data = data.filter(product => product.isAvailable)
    } else if (selectedFilter.value === 'highlighted') {
      data = data.filter(product => product.isHighlighted)
    }
    
    products.value = data
    filterProducts()
    
  } catch (err) {
    error.value = err.response?.data?.message || 'Error al cargar los productos de la categoría'
    console.error('Error fetching products by category:', err)
  } finally {
    loading.value = false
  }
}

// Extraer categorías de los productos
const extractCategories = () => {
  const categoryMap = new Map()
  
  products.value.forEach(product => {
    if (product.category) {
      if (typeof product.category === 'object') {
        categoryMap.set(product.category._id, product.category)
      } else {
        categoryMap.set(product.category, { _id: product.category, name: product.category })
      }
    }
  })
  
  categories.value = Array.from(categoryMap.values())
}

// Filtrar productos
const filterProducts = () => {
  let filtered = [...products.value]
  
  
  if (selectedCategory.value) {
    filtered = filtered.filter(product => {
      if (!product.category) return false
      const categoryId = typeof product.category === 'object' 
        ? product.category._id 
        : product.category
      return categoryId === selectedCategory.value
    })
  }
  
  
  if (searchTerm.value) {
    const search = searchTerm.value.toLowerCase()
    filtered = filtered.filter(product =>
      product.name.toLowerCase().includes(search) ||
      (product.description && product.description.toLowerCase().includes(search))
    )
  }
  
  filteredProducts.value = filtered
}


const handleFilterChange = (value) => {
  selectedFilter.value = value
  fetchProducts()
}

const handleSearchChange = (value) => {
  searchTerm.value = value
  filterProducts()
}

const handleCategoryChange = (value) => {
  selectedCategory.value = value
  filterProducts()
}


const quickFilter = (categoryId) => {
  selectedCategory.value = categoryId
  
  if (categoryId) {
    fetchProductsByCategory(categoryId)
  } else {
    fetchProducts()
  }
}

// Limpiar filtros
const clearFilters = () => {
  selectedFilter.value = 'available' 
  selectedCategory.value = ''
  searchTerm.value = ''
  fetchProducts()
}


const addToCart = async (product) => {
  if (!product.isAvailable) {
    showNotification('Este producto no está disponible')
    return
  }
  
  try {
    
    await api.post('/shoppingcart/add', {
      productId: product._id,
      quantity: 1
    })
    
    showNotification(`${product.name} agregado al carrito`)
    
  } catch (error) {
    
    if (error.response?.status === 401) {
      showNotification('Debes iniciar sesión para agregar productos al carrito')
    } else if (error.response?.status === 400) {
      showNotification('Producto no disponible')
    } else {
      showNotification('Error al agregar al carrito')
    }
    console.error('Error adding to cart:', error)
  }
}

// Mostrar notificación
const showNotification = (message) => {
  cartNotificationMessage.value = message
  showCartNotification.value = true
  
  setTimeout(() => {
    showCartNotification.value = false
  }, 3000)
}

// Cargar carrito desde la API
const loadCart = async () => {
  try {
    const cartData = await cartService.getCart()
    cart.value = cartData
  } catch (error) {
   
    if (error.response?.status === 401) {
      cart.value = null
    } else {
      console.error('Error loading cart:', error)
      cart.value = null
    }
  }
}


const updateCartItemQuantity = async (productId, quantity) => {
  try {
    await cartService.updateCartItem(productId, quantity)
    await loadCart()
    showNotification('Cantidad actualizada')
  } catch (error) {
    showNotification('Error al actualizar cantidad')
    console.error('Error updating cart item:', error)
  }
}

const removeCartItem = async (productId) => {
  try {
    await cartService.removeFromCart(productId)
    await loadCart()
    showNotification('Producto eliminado del carrito')
  } catch (error) {
    showNotification('Error al eliminar producto')
    console.error('Error removing cart item:', error)
  }
}

// Lifecycle
onMounted(async () => {
  await loadCart()
  await fetchProducts()
})
</script>