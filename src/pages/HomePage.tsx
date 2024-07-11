import { useAuth } from '@/auth/AuthContext'
import { FormGallery } from '@/components/FormGallery'
import ProtectedRoute from '@/router/ProtectedRoute'

const HomePage = () => {
  const { isAuth } = useAuth()
  if (!isAuth) return <div>HomePage</div>
  return <ProtectedRoute element={<FormGallery />} />
}

export default HomePage
