import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const ProductDetail = LazyRouter(lazy(() => import('pages/ProductDetail')));

const productDetail: RouteObject = {
  path: Paths.productDetail.route,
  element: <ProductDetail />,
  children: []
};

export default productDetail;
