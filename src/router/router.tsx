import App from '@/App'
import { FormGallery } from '@/components/FormGallery'
import DragPage from '@/pages/DragPage'
import FormBuilderPage from '@/pages/FormBuilderPage'
import FormPreviewPage from '@/pages/FormPreviewPage'
import HomePage from '@/pages/HomePage'
import SignUpPage from '@/pages/SignUpPage'

import { createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import LoginPage from '@/pages/LoginPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'signup',
        element: <SignUpPage />
      },
      {
        path: 'dashboard',
        element: <ProtectedRoute element={<FormGallery />} />,
      },
      {
        path: 'editor',
        element: <ProtectedRoute element={<FormBuilderPage />} />,
      },
      {
        path: 'drag',
        element: <DragPage />,
      },
      {
        path: 'preview',
        element: <FormPreviewPage />,
      },
      // TODO: Not Found page
      // {
      //   path: '*',
      //   element: <NotFound />,
      // },
    ],
  },
])

export default router
