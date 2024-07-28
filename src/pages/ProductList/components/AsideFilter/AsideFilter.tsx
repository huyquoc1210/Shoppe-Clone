import { yupResolver } from '@hookform/resolvers/yup';
import classNames from 'classnames';
import Button from 'components/Button';
import Form from 'components/Form/Form';
import FormInputNumber from 'components/Form/FormInputNumber';
import Paths from 'constants/paths';
import omit from 'lodash.omit';
import { useForm } from 'react-hook-form';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import type { Category } from 'types/category';
import Validator from 'utils/Validator';
import type { ObjectSchema } from 'yup';
import RatingStars from '../RatingStart';
import type { QueryConfig } from 'hooks/useQueryConfig';
import type { ChangeEvent } from 'react';

interface FormData {
  price_from: string;
  price_to: string;
}

interface AsideFilterProps {
  queryConfig: QueryConfig;
  categories: Category[];
}

const schema: ObjectSchema<FormData> = Validator.shape({
  price_from: Validator.string().test({
    name: 'price_from',
    message: 'Giá không phù hợp',
    test: function (value, context) {
      const { price_to } = context.parent;
      if (price_to !== '' && value !== '') {
        return Number(value) <= Number(price_to);
      }
      return price_to !== '' || value !== '';
    }
  }),

  price_to: Validator.string().test({
    name: 'price_to',
    message: 'Giá không phù hợp',
    test: function (value, context) {
      const { price_from } = context.parent;
      if (price_from !== '' && value !== '') {
        return Number(value) >= Number(price_from);
      }
      return price_from !== '' || value !== '';
    }
  })
});

const AsideFilter = (props: AsideFilterProps) => {
  const { categories, queryConfig } = props;
  const { category } = queryConfig;
  const navigate = useNavigate();

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault()
  });

  const handleChangeFromDate = (price: ChangeEvent<HTMLInputElement>) => {
    if (!price) return;
    const { price_to } = form.getValues();
    if (price_to) {
      form.trigger('price_to');
    }
  };

  const handleChangeToDate = (price: ChangeEvent<HTMLInputElement>) => {
    if (!price) return;
    const { price_from } = form.getValues();
    if (price_from) {
      form.trigger('price_from');
    }
  };

  const handleForm = (data: FormData) => {
    navigate({
      pathname: Paths.index,
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_to,
        price_min: data.price_from
      }).toString()
    });
  };

  const handleRemoveAll = () => {
    form.reset();
    navigate({
      pathname: Paths.index,
      search: createSearchParams(
        omit(queryConfig, [
          'category',
          'rating_filter',
          'price_max',
          'price_min'
        ])
      ).toString()
    });
  };

  return (
    <div className='py-4'>
      <Link
        to={Paths.index}
        className={classNames('flex items-center font-bold', {
          'text-orange': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <ul>
        {categories.map((categoryItem) => {
          const { name, _id } = categoryItem;
          const isActive = category === _id;
          return (
            <li className='py-2 pl-2' key={_id}>
              <Link
                to={{
                  pathname: Paths.index,
                  search: createSearchParams({
                    ...queryConfig,
                    category: _id,
                    page: String(1)
                  }).toString()
                }}
                className={classNames('relative px-2', {
                  'text-orange font-semibold': isActive
                })}
              >
                {isActive && (
                  <svg
                    viewBox='0 0 4 7'
                    className='absolute top-1 left-[-10px] h-2 w-2 fill-orange'
                  >
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
      <Link
        to={Paths.index}
        className='mt-4 flex items-center font-bold uppercase'
      >
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-3 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='my-5'>
        <div>Khoảng giá</div>
        <Form form={form} className='mt-2' onSubmit={handleForm}>
          <div className='flex items-start'>
            <FormInputNumber
              name='price_from'
              className='grow'
              classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              placeholder='form'
              type='number'
              onSelect={handleChangeFromDate}
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <FormInputNumber
              onSelect={handleChangeToDate}
              type='number'
              className='grow'
              name='price_to'
              placeholder='to'
              classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
            />
          </div>
          <div className='mt-1 min-h-[1.25rem] text-center text-sm text-red-600'></div>
          <Button
            type='submit'
            className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
          >
            Áp dụng
          </Button>
        </Form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button
        onClick={handleRemoveAll}
        className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
      >
        Xóa tất cả
      </Button>
    </div>
  );
};

export default AsideFilter;
