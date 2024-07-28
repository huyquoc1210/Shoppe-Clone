import PrivateRouter from 'components/Router/PrivateRouter';
import CartLayout from 'layouts/CartLayout';
import MainLayout from 'layouts/MainLayout';
import RouterErrorBoundary from 'pages/error/RouterErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import cart from './Cart';
import login from './Login';
import productDetail from './ProductDetail';
import register from './Register';
import user from './User';
import LazyRouter from 'components/Router/LazyRouter';
import { lazy } from 'react';
import Paths from 'constants/paths';

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
