import App from "@/App";
import FormBuilderPage from "@/pages/FormBuilderPage";

import Layout from "@/pages/Layout";
import { createBrowserRouter } from "react-router-dom";

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
      // TODO: Not Found page
      // {
      //   path: '*',
      //   element: <NotFound />,
      // },
    ],
  },
]);

export default router;
