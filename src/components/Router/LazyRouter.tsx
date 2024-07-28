import LazyLoading from 'components/shared/LazyLoading';
import { Suspense, lazy } from 'react';
import type { Dict } from 'types/shared';

const LazyRouter = (Component: ReturnType<typeof lazy>) => {
  return (props: Dict) => {
    return (
      <Suspense fallback={<LazyLoading />}>
        <Component {...props} />
      </Suspense>
    );
  };
};

export default LazyRouter;
