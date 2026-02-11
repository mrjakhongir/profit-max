import AddInvestorPage from "@/pages/(investor)/add-investor/ui/add-investor-page";
import InvestorDetailsPage from "@/pages/(investor)/details/ui/investor-details-page";
import InvestorsPage from "@/pages/(investor)/investors/ui/investors-page";
import TransactionsPage from "@/pages/transactions/transactions-page";
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
        children: [
          { path: paths.home, element: <HomePage /> },
          { path: paths.investors, element: <InvestorsPage /> },
          { path: paths.addInvestor, element: <AddInvestorPage /> },
          { path: paths.investorDetails, element: <InvestorDetailsPage /> },
          { path: paths.transactions, element: <TransactionsPage /> },
        ],
      },

      { path: "*", element: <div>404</div> },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
