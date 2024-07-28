import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { singUp } from 'api/auth.api';
import Button from 'components/Button';
import Form from 'components/Form/Form';
import FormInput from 'components/Form/FormInput';
import PageTitle from 'components/Pages/PageTitle';
import useAuth from 'hooks/useAuth';
import omit from 'lodash.omit';
import { useEffect } from 'react';
import { useForm, useFormState, useWatch } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { HttpErrorResponse } from 'types/http';
import { axiosUnprocessableEntityError } from 'utils/utils';
import Validator from 'utils/Validator';
import * as yup from 'yup';

interface FormData {
  email: string;
  password: string;
  confirm_password: string;
}

const schema = yup.object({
  email: Validator.email().required(),
  password: Validator.string().required(),
  confirm_password: Validator.string()
    .required()
    .test({
      name: 'confirm_password',
      message: 'Mật khẩu không trùng khớp',
      test: (value, context) => {
        const { password } = context.parent;
        if (value && password) {
          return value === password;
        }
        return true;
      }
    })
});

const Register = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault()
  });

  const { login } = useAuth();

  // console.log(registerAccMutation);
  // const { control } = useFormContext();
  const control = form.control;

  const { touchedFields } = useFormState({
    control
  });

  const password = useWatch({ control, name: 'password' });

  useEffect(() => {
    if (touchedFields.confirm_password) {
      form.trigger('confirm_password');
    }
  }, [password, touchedFields]);

  const registerAccMutation = useMutation({
    mutationFn: (payload: Omit<FormData, 'confirm_password'>) => singUp(payload)
  });

  const handleSubmit = (data: FormData) => {
    const payload = omit(data, ['confirm_password']);
    registerAccMutation.mutate(payload, {
      onSuccess: () => {
        login(data);
      },
      onError: (error) => {
        if (axiosUnprocessableEntityError<HttpErrorResponse<Omit<FormData, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data;
          if (formError?.email) {
            form.setError('email', { message: formError.email, type: 'Server' });
          }
          if (formError?.password) {
            form.setError('password', { message: formError.password, type: 'Server' });
          }
        }
      }
    });
  };

  return (
    <PageTitle title='Register'>
      <div className='bg-orange'>
        <div className='container'>
          <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <Form form={form} onSubmit={handleSubmit} className='rounded bg-white p-10 shadow-sm'>
                <div className='text-2xl'>Đăng Ký</div>
                <FormInput
                  name='email'
                  placeholder='Email'
                  type='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <FormInput
                  name='password'
                  placeholder='Password'
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <FormInput
                  name='confirm_password'
                  placeholder='ConfirmPassword'
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <div className='mt-2'>
                  <Button
                    className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                    isLoading={registerAccMutation.isPending}
                    disabled={registerAccMutation.isPending}
                  >
                    Đăng ký
                  </Button>
                </div>
                <div className='mt-8 flex items-center justify-center'>
                  <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                  <Link className='ml-1 text-red-400' to='/login'>
                    Đăng nhập
                  </Link>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </PageTitle>
  );
};

export default Register;
