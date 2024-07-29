import LazyRouter from 'components/Router/LazyRouter';
import PrivateRouter from 'components/Router/PrivateRouter';
import Paths from 'constants/paths';
import CartLayout from 'layouts/CartLayout';
import MainLayout from 'layouts/MainLayout';
import RouterErrorBoundary from 'pages/error/RouterErrorBoundary';
import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import cart from './Cart';
import login from './Login';
import productDetail from './ProductDetail';
import register from './Register';
import user from './User';

const ProductList = LazyRouter(lazy(() => import('pages/ProductList')));

const Router = () => {
  const router = createBrowserRouter([
    login,
    register,
    {
      path: '/', // Root
      element: (
        <PrivateRouter>
          <CartLayout />
        </PrivateRouter>
      ),
      errorElement: <RouterErrorBoundary />,
      children: [cart]
    },
    {
      path: '/', // Root
      element: (
        <PrivateRouter>
          <MainLayout />
        </PrivateRouter>
      ),
      errorElement: <RouterErrorBoundary />,
      children: [user]
    },
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <RouterErrorBoundary />,
      children: [
        productDetail,
        {
          path: Paths.productList.route,
          index: true,
          element: <ProductList />
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
