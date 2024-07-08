import { lazy } from "react";
import { Outlet } from "react-router-dom";
// CUSTOM COMPONENTS
import Loadable from "./Loadable";
import { AuthGuard } from "components/auth";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import DashboardPage from "pages/dashboards";
import BudgetStrategiesPage from "pages/budget-strategies";
import PortfolioPage from "pages/portfolio";
import HistoryPage from "pages/portfolio/history";
import PersonalMethodsPage from "pages/personal-methods";

export const MenuRoutes = [{
  path: "/",
  element: <AuthGuard>
        <DashboardLayout>
          <Outlet />
        </DashboardLayout>
      </AuthGuard>,
  children: [{
    index: true,
    element: <DashboardPage />
  },{
    path: "budget-strategies",
    element: <BudgetStrategiesPage />
  }
  ,{
    path: "portfolio",
    element: <PortfolioPage />,   
  }
  ,{
    path: "portfolio/:_botId",
    element: <HistoryPage />,   
  },
  {
    path: "personal-methods",
    element: <PersonalMethodsPage />,   
  }

]
}];