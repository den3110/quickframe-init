import { lazy } from "react";
import Loadable from "./Loadable";
import { AuthRoutes } from "./auth";
import { PublicRoutes } from "./public";
import { AuthGuard } from "components/auth";
import { Navigate, Outlet } from "react-router-dom";
import DashboardPage from "pages/dashboards";
import DashboardLayout from "layouts/dashboard/DashboardLayout";
import { MenuRoutes } from "./menu";

// GLOBAL ERROR PAGE
const ErrorPage = Loadable(lazy(() => import("pages/404")));
export const routes = () => {
  return [
 
  // GLOBAL ERROR PAGE
  {
    path: "*",
    element: <ErrorPage />
  },
 
  ...MenuRoutes,
  // AUTHENTICATION PAGES ROUTES & DIFFERENT AUTH DEMO PAGES ROUTES
  ...AuthRoutes,
  // PAGES ROUTES
  ...PublicRoutes];
};