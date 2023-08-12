import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import Budget from "../pages/Budget";

export const AppRoutes = () => {
  const routes = [
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/login",
      element: <LogIn />,
    },
    {
      path: "/login",
      element: <LogIn />,
    },
    {
      path: "/budget",
      element: <Budget />,
    },
  ];
  return <RouterProvider router={createBrowserRouter(routes)} />;
};
