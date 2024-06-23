import App from '@/App'
import DragPage from '@/pages/DragPage'
import FormBuilderPage from '@/pages/FormBuilderPage'
import FormPreviewPage from '@/pages/FormPreviewPage'

import Layout from '@/pages/Layout'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <App />,
      },
      {
        path: 'design',
        element: <FormBuilderPage />,
      },
      {
        path: 'drag',
        element: <DragPage />,
      },
      {
        path: 'preview',
        element: <FormPreviewPage />
      }
      // TODO: Not Found page
      // {
      //   path: '*',
      //   element: <NotFound />,
      // },
    ],
  },
])

export default router
