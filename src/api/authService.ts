import createAxiosInstance from '@/auth/axiosInstance'

const api = createAxiosInstance()

type AuthResponse = {
  accessToken: string
  username: string
  role: string[]
  tokenType: string
}

export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { username: email, password })
  return response.data as AuthResponse
}

export const signup = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await api.post('/auth/register', { username, password })
  return response.data as AuthResponse
}
