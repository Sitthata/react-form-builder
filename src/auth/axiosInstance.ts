import axios from 'axios'

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
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
      const token = localStorage.getItem('token')
      if (error.response.status === 401 && !originalRequest._isRetry) {
        originalRequest._isRetry = true
        try {
          const response = await axios.post(
            'http://localhost:3000/refresh',
            {
              token,
            },
            { withCredentials: true }
          )
          localStorage.setItem('token', response.data.accessToken)
          return instance(originalRequest)
        } catch (error) {
          localStorage.removeItem('token')
          return Promise.reject(error)
        }
      }
      return Promise.reject(error)
    }
  )

  return instance
}

export default createAxiosInstance
