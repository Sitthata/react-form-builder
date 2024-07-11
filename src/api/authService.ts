import createAxiosInstance from '@/auth/axiosInstance'

const api = createAxiosInstance()

type AuthResponse = {
  accessToken: string
  username: string
  role: string[]
  tokenType: string
}

const URL = import.meta.env.VITE_ENV === 'dev' ? '' : '/auth'

export const login = async (email: string, password: string) => {
  const response = await api.post(`${URL}/login`, { email, password })
  return response.data as AuthResponse
}

export const signup = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await api.post(`${URL}/register`, { email, password })
  return response.data as AuthResponse
}
