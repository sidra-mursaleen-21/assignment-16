import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "../../layout";
import Signup from "../../pages/signUp";
import Login from "../../pages/logIn";
import Home from "../../pages/home";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
