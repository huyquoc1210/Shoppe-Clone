import classNames from 'classnames';
import Paths from 'constants/paths';
import type { QueryConfig } from 'hooks/useQueryConfig';

import { createSearchParams, Link } from 'react-router-dom';

interface PaginationProps {
  queryConfig: QueryConfig;
  pageSize: number;
}

const RANGE = 2;
const Pagination = (props: PaginationProps) => {
  const { queryConfig, pageSize } = props;
  const page = Number(queryConfig.page);

  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span
            key={index}
            className='bg-white rounded px-3 shadow-sm mx-2 cursor-pointer'
          >
            ...
          </span>
        );
      }
      return null;
    };

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span
            key={index}
            className='bg-white rounded px-3 shadow-sm mx-2 cursor-pointer'
          >
            ...
          </span>
        );
      }
      return null;
    };

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;
        // console.log('pageNumber', pageNumber);

        if (
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE - 1
        ) {
          return renderDotAfter(index);
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index);
          } else if (
            pageNumber > page + RANGE &&
            pageNumber < pageSize - RANGE + 1
          ) {
            return renderDotAfter(index);
          }
        } else if (
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        }

        return (
          <Link
            to={{
              pathname: Paths.index,
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString()
              }).toString()
            }}
            key={index}
            className={classNames(
              'bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border',
              {
                'border-cyan-500': pageNumber === page,
                'border-transparent': pageNumber !== page
              }
            )}
          >
            {pageNumber}
          </Link>
        );
      });
  };

  return (
    <div className='mt-6 flex flex-wrap justify-center'>
      {page === 1 ? (
        <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer'>
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: Paths.index,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed'
        >
          Prev
        </Link>
      )}

      {renderPagination()}

      {page === pageSize ? (
        <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-not-allowed'>
          Next
        </span>
      ) : (
        <Link
          to={{
            pathname: Paths.index,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer'
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Pagination;
