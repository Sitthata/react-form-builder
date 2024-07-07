import { createContext, useContext, useState } from 'react'
import createAxiosInstance from './axiosInstance'

interface AuthContextType {
  token: string | null
  isAuth: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('token') || null
  )
  const isAuth = !!token

  const login = async (email: string, password: string) => {
    const api = createAxiosInstance()
    try {
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.accessToken)
      setToken(data.accessToken)
    } catch (error) {
      console.error(error)
      throw new Error('Login failed')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
  }
  return (
    <AuthContext.Provider value={{ token, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
