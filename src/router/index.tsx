import PrivateRouter from 'components/Router/PrivateRouter';
import CartLayout from 'layouts/CartLayout';
import MainLayout from 'layouts/MainLayout';
import RouterErrorBoundary from 'pages/error/RouterErrorBoundary';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import cart from './Cart';
import login from './Login';
import productDetail from './ProductDetail';
import productList from './ProductList';
import register from './Register';
import start from './Start';
import user from './User';

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
      children: [start, productDetail, productList]
    }
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
