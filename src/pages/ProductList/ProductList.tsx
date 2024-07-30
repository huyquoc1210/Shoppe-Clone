import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { getCategories } from 'api/categories';
import { getProducts } from 'api/product.api';
import PageTitle from 'components/Pages/PageTitle';
import Pagination from 'components/Pagination';
import useQueryConfig from 'hooks/useQueryConfig';
import type { ProductListConfig } from 'types/product';
import AsideFilter from './components/AsideFilter';
import Product from './components/Product/Product';
import SortProductList from './components/SortProductList';

const ProductList = () => {
  const queryConfig = useQueryConfig();

  const { data: productData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => getProducts(queryConfig as ProductListConfig),

    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000
  });

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories(),
    placeholderData: keepPreviousData
  });

  return (
    <PageTitle title='Trang chủ'>
      <div className='bg-gray-200 py-6'>
        <div className='container'>
          {productData && (
            <div className='grid grid-cols-12 gap-6'>
              <div className='col-span-3'>
                <AsideFilter queryConfig={queryConfig} categories={categoriesData?.data || []} />
              </div>
              <div className='col-span-9'>
                <SortProductList
                  queryConfig={queryConfig}
                  pageSize={productData.data.pagination.page_size}
                />
                <div className='mt-6 grid gird-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
                  {productData.data.products.map((product) => {
                    const { _id } = product;
                    return (
                      <div className='col-span-1' key={_id}>
                        <Product product={product} />
                      </div>
                    );
                  })}
                </div>
                <Pagination
                  queryConfig={queryConfig}
                  pageSize={productData.data.pagination.page_size}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTitle>
  );
};

export default ProductList;
