import NProgress from 'nprogress';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const LazyLoading = () => {
  const location = useLocation();
  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, [location.pathname]);

  return null;
};

export default LazyLoading;
