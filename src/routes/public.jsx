import { lazy } from "react";
import { Outlet } from "react-router-dom";
// CUSTOM COMPONENTS
import Loadable from "./Loadable";
import MainLayout from "layouts/main/MainLayout";

// const Home = Loadable(lazy(() => import("pages/home")));

// ROLE BASED PERMISSION TEST PAGE
const Permission = Loadable(lazy(() => import("pages/permission")));


export const PublicRoutes = [
// { path: "home", element: <Home /> },
{
  path: "permission",
  element: <Permission />
},  {
  element: <MainLayout>
        <Outlet />
      </MainLayout>,
  children: []
}];