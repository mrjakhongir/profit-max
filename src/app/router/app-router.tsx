import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../../pages/home/home";
import LoginPage from "../../pages/login/login-page";
import { paths } from "../../shared/routes";
import { AppLayout } from "../layout/app-layout";
import { AuthLayout } from "../layout/auth-layout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      // ✅ public route
      { path: paths.login, element: <LoginPage /> },

      // ✅ protected routes
      {
        element: <AuthLayout />,
        children: [{ path: paths.home, element: <HomePage /> }],
      },

      { path: "*", element: <div>404</div> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
