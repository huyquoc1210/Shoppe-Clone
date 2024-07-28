import Paths from 'constants/paths';
import { Navigate, type RouteObject } from 'react-router-dom';

const startProduct: RouteObject = {
  index: true,
  element: <Navigate to={Paths.productList.route} replace />
};

export default startProduct;
