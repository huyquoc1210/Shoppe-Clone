import Paths from 'constants/paths';
import { Navigate, type RouteObject } from 'react-router-dom';

const start: RouteObject = {
  index: true,
  element: <Navigate to={Paths.user.profile.route} replace />
};

export default start;
