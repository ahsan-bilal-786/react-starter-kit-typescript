import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import DashboardLayout from "layouts/Dashboard";
import Dashboard from "pages/Dashboard";
import Profile from "pages/Profile";
import Account from "pages/Account";

import Login from "pages/Auth/Login";
import React from "react";

/*
  AppRoutes object contains path strings to use across application
*/
export const AppRoutes = {
  default: "/",
  profile: "/profile",
  account: "/account",
  login: "/login",
};

/*
  routes object returns <Routes> components with <Route> inside it
*/
const routes: RouteObject[] = [
  {
    path: AppRoutes.login,
    element: <Login />,
  },
  {
    element: (
    //   <RequireAuth>
        <DashboardLayout />
    //   </RequireAuth>
    ),
    children: [
      {
        path: AppRoutes.default,
        element: (
          <>
            <Dashboard />
          </>
        ),
      },
      {
        path: AppRoutes.profile,
        element: (
          <>
            <Profile />
          </>
        ),
      },
      {
        path: AppRoutes.account,
        element: (
          <>
            <Account />
          </>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={AppRoutes.default} />,
  },
];

export const AppRouter = () => {
  const renderRoutes = useRoutes(routes);
  return renderRoutes;
};
