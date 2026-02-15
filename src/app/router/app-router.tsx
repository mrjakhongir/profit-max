import AddInvestorPage from "@/pages/(investor)/add-investor/ui/add-investor-page";
import InvestorDetailsPage from "@/pages/(investor)/details/ui/investor-details-page";
import InvestorsPage from "@/pages/(investor)/investors/ui/investors-page";
import DepositDetailsPage from "@/pages/(investor)/transactions/ui/deposit-details-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../../pages/home/ui/home-page";
import LoginPage from "../../pages/login/login-page";
import { paths } from "../../shared/routes";
import { AppLayout } from "../layout/app-layout";
import { AuthLayout } from "../layout/auth-layout";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: paths.login, element: <LoginPage /> },

      {
        element: <AuthLayout />,
        children: [
          { path: paths.home, element: <HomePage /> },

          {
            path: paths.investors.root,
            children: [
              { index: true, element: <InvestorsPage /> },
              { path: paths.investors.add, element: <AddInvestorPage /> },

              {
                path: paths.investors.details,
                element: <InvestorDetailsPage />,
              },
              {
                path: paths.investors.deposits,
                element: <DepositDetailsPage />,
              },
            ],
          },
        ],
      },

      { path: "*", element: <div>404</div> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
