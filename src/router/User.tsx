import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import profile from './Profile';
import changePassword from './ChangePassword';
import historyPurchase from './HistoryPurchase';
import start from './Start';

const UserLayout = LazyRouter(lazy(() => import('pages/User/UserLayout')));

const user: RouteObject = {
  path: Paths.user.route,
  element: <UserLayout />,
  children: [start, profile, changePassword, historyPurchase]
};

export default user;
