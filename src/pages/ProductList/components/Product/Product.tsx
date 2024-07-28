import ProductRating from 'components/ProductRating';
import Paths from 'constants/paths';
import { Link } from 'react-router-dom';
import type { Product as ProductType } from 'types/product';
import { formatCurrency, formatNumberToSocialStyle, generateNameId } from 'utils/utils';

interface ProductProps {
  product: ProductType;
}

const Product = (props: ProductProps) => {
  const { product } = props;
  // console.log(product);
  const { price, price_before_discount, sold, name, image, rating, _id } = product;

  return (
    <Link to={`${Paths.index}${generateNameId({ name, id: _id })}`}>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img src={image} alt={name} className='absolute top-0 left-0 h-full w-full bg-white object-cover' />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='min-h-[2rem] text-xs line-clamp-2'>{name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>₫</span>
              <span className='text-sm'>{formatCurrency(price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={rating} />
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
