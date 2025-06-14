import api from "./api";

const OrderService = {
    // Crear una nueva orden (pedido)
    async createOrder(orderData) {
        const response = await api.post("/orders", orderData);
        return response.data;
    },

    // Obtener las órdenes del usuario autenticado
    async getOrders() {
        const response = await api.get("/orders");
        return response.data;
    },

    // Obtener una orden por ID (si es dueño o admin)
    async getOrderById(orderId) {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    },

    // Obtener todas las órdenes (solo admin)
    async getAllOrders() {
        const response = await api.get("/orders/all/orders");
        return response.data;
    },

    // Actualizar el estado de una orden (solo admin)
    async updateOrderStatus(orderId, status) {
        const response = await api.get(`/orders/${orderId}/status`, { status });
        return response.data;
    },
};

export default OrderService;
