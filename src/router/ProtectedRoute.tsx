import { useAuth } from '@/auth/AuthContext'
import { Navigate } from 'react-router'

type ProtectedRouteProps = {
  element: React.ReactNode
}

const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isAuth } = useAuth()
  if (!isAuth) {
    return <Navigate to="/login" />
  }
  return element
}

export default ProtectedRoute
