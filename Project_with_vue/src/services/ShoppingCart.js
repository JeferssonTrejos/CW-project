import api from "./api";

const ShoppingCartService = {
    // Obtiene el carrito de compras del usuario autenticado
    async getShoppingCart() {
        const response = await api.get("/shoppingcart");
        return response.data;
    },

    // Agrega un producto al carrito
    async addToShoppingCart(productId, quantity = 1) {
        const response = await api.post("/shoppingcart/add", { productId, quantity });
        return response.data;
    },

    // Actualiza la cantidad de un producto en el carrito
    async updateCartItem(itemId, quantity) {
        const response = await api.put(`/shoppingcart/item/${itemId}`, { quantity });
        return response.data;
    },

    // Elimina un producto del carrito
    async removeFromCart(itemId) {
        const response = await api.delete(`/shoppingcart/item/${itemId}`);
        return response.data;
    },
};

export default ShoppingCartService;
