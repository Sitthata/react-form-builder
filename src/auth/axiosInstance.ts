import { AuthResponse } from '@/api/authService'
import axios from 'axios'

const BASE_URL =
  import.meta.env.VITE_ENV === 'dev'
    ? 'http://localhost:3000'
    : import.meta.env.VITE_PROD_URL

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use(
    (config) => {
      const auth: AuthResponse = JSON.parse(localStorage.getItem('auth') || '{}')
      if (auth.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config
      const auth: AuthResponse = JSON.parse(localStorage.getItem('auth') || '{}')
      if (error.response.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true
        try {
          const response = await axios.post(
            `${BASE_URL}/refresh`,
            {
              accessToken: auth.accessToken
            },
            { withCredentials: true }
          )
          localStorage.setItem('auth', JSON.stringify(response.data))
          return instance(originalRequest)
        } catch (error) {
          localStorage.removeItem('auth')
          return Promise.reject(error)
        }
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export default createAxiosInstance
