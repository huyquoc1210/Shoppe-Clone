import CartHeader from 'components/CartHeader';
import Footer from 'components/Footer';
import { Outlet } from 'react-router-dom';
import type { FCC } from 'types/react';

const CartLayout: FCC = (props) => {
  const { children } = props;

  return (
    <>
      <CartHeader />
      {children}
      <Outlet />
      <Footer />
    </>
  );
};

export default CartLayout;
