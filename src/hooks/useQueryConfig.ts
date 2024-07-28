import isUndefined from 'lodash.isundefined';
import omitBy from 'lodash.omitby';
import type { ProductListConfig } from 'types/product';
import useQueryParams from './useQueryParams';

export type QueryConfig = {
  [key in keyof ProductListConfig]: string;
};

const useQueryConfig = () => {
  const queryParams: QueryConfig = useQueryParams();
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '20',
      sort_by: queryParams.sort_by,
      order: queryParams.order,
      exclude: queryParams.exclude,
      rating_filter: queryParams.rating_filter,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      name: queryParams.name,
      category: queryParams.category
    },
    isUndefined
  );
  return queryConfig;
};

export default useQueryConfig;
