import { useAuth } from '@/auth/AuthContext'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

type ProtectedRouteProps = {
  element: React.ReactNode
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isAuth } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [isAuth, navigate])

  return element
}

export default ProtectedRoute
