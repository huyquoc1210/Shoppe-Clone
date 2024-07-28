import Footer from 'components/Footer';
import RegisterHeader from 'components/RegisterHeader';
import { Outlet } from 'react-router-dom';
import type { FCC } from 'types/react';

const RegisterLayout: FCC = (props) => {
  const { children } = props;
  return (
    <>
      <RegisterHeader />
      {children}
      <Outlet />
      <Footer />
    </>
  );
};

export default RegisterLayout;
