import App from '@/App'
import { FormGallery } from '@/components/FormGallery'
import DragPage from '@/pages/DragPage'
import FormBuilderPage from '@/pages/FormBuilderPage'
import FormPreviewPage from '@/pages/FormPreviewPage'

import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <FormGallery />,
      },
      {
        path: 'editor',
        element: <FormBuilderPage />,
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
