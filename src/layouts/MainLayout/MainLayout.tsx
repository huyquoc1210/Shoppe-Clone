import Footer from 'components/Footer';
import Header from 'components/Header';
import { Outlet } from 'react-router-dom';
import type { FCC } from 'types/react';

const MainLayout: FCC = (props) => {
  const { children } = props;
  return (
    <>
      <Header />
      {children}
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
