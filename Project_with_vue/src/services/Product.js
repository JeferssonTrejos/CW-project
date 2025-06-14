import api from "./api";

const ProductService = {
  //Otiebe todas las categorias
  async getAllCategories() {
    const response = await api.get("/categories");
    return response.data;
  },

  // Obtiene todos los productos
  async getAllProducts() {
    const response = await api.get("/products");
    return response.data;
  },

  // Obtiene productos destacados y disponibles
  async getAllProductsHighlighted() {
    const response = await api.get("/products/highlighted");
    return response.data;
  },

  // Obtiene productos disponibles
  //   async getAvailableProducts() {
  //     const response = await api.get("/products/available");
  //     return response.data;
  //   },

  // Crea un nuevo producto
  async createProduct(productData) {
    const response = await api.post("/products", productData);
    return response.data;
  },

  // Actualiza un producto existente
  async updateProduct(id, productData) {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  },

  // Marca un producto como no disponible
  async markProductAsUnavailable(id) {
    const response = await api.patch(`/products/${id}/unavailable`);
    return response.data;
  },

  // Elimina un producto
  async deleteProduct(id) {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  // Obtiene un producto por ID
  async getProductById(id) {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Obtiene productos por categoría
  async getProductsByCategory(categoryId) {
    const response = await api.get(`/products/category/${categoryId}`);
    return response.data;
  },
};

export default ProductService;
