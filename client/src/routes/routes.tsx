import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import Budget from "../pages/Budget";
import BudgetAnalytics from "../pages/BudgetAnalytics";

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
      path: "/budget",
      element: <Budget />,
    },
    {
      path: "/analytics",
      element: <BudgetAnalytics />,
    },
  ];
  return <RouterProvider router={createBrowserRouter(routes)} />;
};
