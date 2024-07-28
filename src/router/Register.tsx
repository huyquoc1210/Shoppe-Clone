import LazyRouter from 'components/Router/LazyRouter';
import PublicRouter from 'components/Router/PublicRouter';
import Paths from 'constants/paths';
import RegisterLayout from 'layouts/RegisterLayout';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const Register = LazyRouter(lazy(() => import('pages/Register')));

const register: RouteObject = {
  path: '',
  element: (
    <PublicRouter>
      <RegisterLayout />
    </PublicRouter>
  ),
  children: [
    {
      path: Paths.register.route,
      element: <Register />
    }
  ]
};

export default register;
