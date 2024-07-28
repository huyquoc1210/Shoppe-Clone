import Paths from 'constants/paths';
import useAuth from 'hooks/useAuth';
import { Fragment } from 'react';
import { Navigate } from 'react-router-dom';
import type { FCC } from 'types/react';

const PublicRouter: FCC = (props) => {
  const { children } = props;
  // const { isAuthenticated } = useContext(AuthContext);
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={Paths.index} replace />;
  }

  return <Fragment>{children}</Fragment>;
};

export default PublicRouter;
