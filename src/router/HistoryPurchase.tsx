import LazyRouter from 'components/Router/LazyRouter';
import Paths from 'constants/paths';
import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';

const HistoryPurchase = LazyRouter(
  lazy(() => import('pages/User/pages/HistoryPurchase'))
);

const historyPurchase: RouteObject = {
  path: Paths.user.historyPurchase.route,
  element: <HistoryPurchase />,
  children: []
};

export default historyPurchase;
