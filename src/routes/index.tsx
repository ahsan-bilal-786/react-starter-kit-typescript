import React, { lazy, Suspense, FunctionComponent } from 'react';
import map from 'lodash/map';
import { Route, Switch, Redirect } from 'react-router-dom';
import siteLayout from 'layouts/Site';
import dashboardLayout from 'layouts/Dashboard';
import Login from 'pages/Auth/Login';
import Logout from 'pages/Auth/Logout';
const Signup = lazy(() => import('pages/Auth/Signup'));
const ChangePassword = lazy(() => import('pages/Auth/ChangePassword'));
const Dashboard = lazy(() => import('pages/Dashboard'));
const Profile = lazy(() => import('pages/Profile'));

export const RoutesHOC = (routes: any, defaultPath: any) => {
  const Routes: FunctionComponent<any> = (props: any) => (
    <Suspense fallback={<></>}>
      <Switch>
        {map(routes, (route) => {
          return (
            <Route
              key={route.name}
              path={route.path}
              component={route.component}
            />
          );
        })}
        <Redirect to={defaultPath} />
      </Switch>
    </Suspense>
  );
  return Routes;
};

export const DashboardRoutes = {
  PROFILE: {
    path: '/profile',
    name: 'Profile',
    component: Profile,
  },
  CHANGE_PASSWORD: {
    path: '/change-password',
    name: 'Change Password',
    component: ChangePassword,
  },
  MAIN: {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
};

export const AppRoutes = {
  SIGNUP: {
    path: '/signup',
    name: 'Signup',
    component: siteLayout(Signup),
  },
  LOGIN: {
    path: '/login',
    name: 'Login',
    component: siteLayout(Login),
  },
  LOGOUT: {
    path: '/logout',
    name: 'Logout',
    component: Logout,
  },
  DASHBOARD: {
    path: '/',
    name: 'Dashboard',
    component: dashboardLayout(RoutesHOC(DashboardRoutes, '/')),
  },
};

export const DEFAULT_PATH = AppRoutes.LOGIN.path;
export const USER_LANDING_PAGE = AppRoutes.DASHBOARD.path;

export const AppRouter = RoutesHOC(AppRoutes, '/login');
