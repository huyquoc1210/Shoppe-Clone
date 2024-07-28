import type { DispatchAction } from 'types/react';
import ReactPaginate from 'react-paginate';

interface PaginationProps {
  page: number;
  setPage: DispatchAction<number>;
  pageSize: number;
}

const Pagination = (props: PaginationProps) => {
  const { page, setPage, pageSize } = props;

  const handlePageClick = (event: any) => {
    console.log(event);
  };

  return (
    <ReactPaginate
      previousLabel='Previous'
      nextLabel='Next'
      pageClassName='block border border-solid border-lightGray hover:bg-lightGray w-8 h-8 flex items-center justify-center rounded-md mr-2'
      breakLabel='...'
      pageCount={pageSize}
      marginPagesDisplayed={1}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName='flex items-center justify-center mt-8 mb-4'
      activeClassName='bg-orange-400 text-white'
    />
  );
};

export default Pagination;
