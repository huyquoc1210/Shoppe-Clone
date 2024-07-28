import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const Profile = LazyRouter(lazy(() => import('pages/User/pages/Profile')));

const profile: RouteObject = {
  path: Paths.user.profile.route,
  element: <Profile />,
  children: []
};

export default profile;
