import App from "@/App";
import FormsQuestion from "@/pages/FormsQuestion";
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
        element: <FormsQuestion />,
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
