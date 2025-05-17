// services/authService.js
import api from './axiosInstance' // Usa tu instancia configurada

export const loginUser = async ({ username, password }) => {
  const response = await api.post('token/', {
    username,
    password,
  })

  return response.data // { access, refresh }
}
