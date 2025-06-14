import api from './api'

const authService = {
  async login(credentials) {
    const response = await api.post('/auth/login', credentials)
    return response.data
  },

  async logout() {
    const response = await api.post('/auth/logout')
    return response.data
  },

  async verifyToken() {
    const response = await api.get('/auth/profile')
    return response.data
  },

  async register(userData) {
    const response = await api.post('/auth/register', userData)
    return response.data
  },

  // async refreshToken() {
  //   const response = await api.post('/auth/refresh')
  //   return response.data
  // },

  // async changePassword(passwordData) {
  //   const response = await api.put('/auth/change-password', passwordData)
  //   return response.data
  // }
}

export default authService