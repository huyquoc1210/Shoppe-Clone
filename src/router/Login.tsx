import LazyRouter from 'components/Router/LazyRouter';
import PublicRouter from 'components/Router/PublicRouter';
import Paths from 'constants/paths';
import RegisterLayout from 'layouts/RegisterLayout';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const Login = LazyRouter(lazy(() => import('pages/Login')));

const login: RouteObject = {
  path: '',
  element: (
    <PublicRouter>
      <RegisterLayout />
    </PublicRouter>
  ),
  children: [
    {
      path: Paths.login.route,
      element: <Login />
    }
  ]
};

export default login;
