import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const Cart = LazyRouter(lazy(() => import('pages/Cart')));

const cart: RouteObject = {
  path: Paths.cart.route,
  element: <Cart />,
  children: []
};

export default cart;
