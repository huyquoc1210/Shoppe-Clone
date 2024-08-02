import LazyRouter from 'components/Router/LazyRouter';
import { lazy } from 'react';
import { type RouteObject } from 'react-router-dom';

const ProductList = LazyRouter(lazy(() => import('pages/ProductList')));

const start: RouteObject = {
  index: true,
  element: <ProductList />
};

export default start;
