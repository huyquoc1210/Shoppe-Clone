import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const ChangePassword = LazyRouter(
  lazy(() => import('pages/User/pages/ChangePassword'))
);

const changePassword: RouteObject = {
  path: Paths.user.changPassword.route,
  element: <ChangePassword />,
  children: []
};

export default changePassword;
