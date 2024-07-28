import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const ProductList = LazyRouter(lazy(() => import('pages/ProductList')));

const productList: RouteObject = {
  path: Paths.productList.route,
  element: <ProductList />,
  children: []
};

export default productList;
