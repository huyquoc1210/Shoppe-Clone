import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

//Error pages
import NotFound from './NotFound';
import Unauthorized from './Unauthorized';
import Forbidden from './Forbidden';
import Reload from './Reload';

const RouterErrorBoundary = () => {
  const error = useRouteError();
  console.log(error);

  if (!isRouteErrorResponse(error)) {
    throw error;
  }

  switch (error.status) {
    case 404:
      return <NotFound />;
    case 401:
      return <Unauthorized />;
    case 403:
      return <Forbidden />;
    default:
      return <Reload />;
  }
};

export default RouterErrorBoundary;
