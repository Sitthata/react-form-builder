import App from '@/App'
import DragPage from '@/pages/DragPage'
import FormBuilderPage from '@/pages/FormBuilderPage'

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
