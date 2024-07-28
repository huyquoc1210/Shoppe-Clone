import { yupResolver } from '@hookform/resolvers/yup';
import omit from 'lodash.omit';
import { useForm } from 'react-hook-form';
import Validator from 'utils/Validator';
import * as yup from 'yup';
import useQueryConfig from './useQueryConfig';
import { createSearchParams, useNavigate } from 'react-router-dom';
import Paths from 'constants/paths';

export interface FormData {
  search: string;
}

const schema = yup.object({
  search: Validator.string().required()
});

const useSearchProducts = () => {
  const queryConfig = useQueryConfig();
  const navigate = useNavigate();

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault()
  });

  const handleSubmit = (data: FormData) => {
    const conFig = queryConfig.order
      ? omit(
          {
            ...queryConfig,
            name: data.search
          },
          ['order', 'sort_by']
        )
      : omit({
          ...queryConfig,
          name: data.search
        });
    navigate({
      pathname: Paths.index,
      search: createSearchParams(conFig).toString()
    });
  };
  return { handleSubmit, form };
};

export default useSearchProducts;
