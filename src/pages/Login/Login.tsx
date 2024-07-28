import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { signIn } from 'api/auth.api';
import Button from 'components/Button';
import Form from 'components/Form/Form';
import FormInput from 'components/Form/FormInput';
import PageTitle from 'components/Pages/PageTitle';
import useAuth from 'hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import type { HttpErrorResponse } from 'types/http';
import { axiosUnprocessableEntityError } from 'utils/utils';
import Validator from 'utils/Validator';
import * as yup from 'yup';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object({
  email: Validator.email().required(),
  password: Validator.string().required()
});

const Login = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault()
  });
  const { login } = useAuth();

  // const control = form.control;

  // const { isSubmitSuccessful } = useFormState({
  //   control
  // });

  const loginMutation = useMutation({
    mutationFn: (payload: FormData) => signIn(payload)
  });

  const onSubmit = (data: FormData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        login(data);
        form.reset();
      },
      onError: (error) => {
        if (axiosUnprocessableEntityError<HttpErrorResponse<FormData>>(error)) {
          console.log(error.response?.data.data);
          const formError = error.response?.data.data;
          console.log(formError);
          if (formError?.email) {
            form.setError('email', {
              message: formError.email,
              type: 'Server'
            });
          }
          if (formError?.password) {
            form.setError('password', {
              message: formError.password,
              type: 'Server'
            });
          }
        }
      }
    });
  };

  return (
    <PageTitle title='Login'>
      <div className='bg-orange'>
        <div className='container'>
          <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
            <div className='lg:col-span-2 lg:col-start-4'>
              <Form
                form={form}
                onSubmit={onSubmit}
                className='rounded bg-white p-10 shadow-sm'
              >
                <div className='text-2xl'>Đăng Nhập</div>
                <FormInput<FormData>
                  name='email'
                  type='email'
                  placeholder='Email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <FormInput<FormData>
                  name='password'
                  type='password'
                  placeholder='Password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                />
                <div className='mt-2'>
                  <Button
                    className='flex w-full items-center justify-center bg-red-500 py-4 px-2 text-sm uppercase text-white hover:bg-red-600'
                    isLoading={loginMutation.isPending}
                    disabled={loginMutation.isPending}
                  >
                    Đăng nhập
                  </Button>
                </div>
                <div className='mt-8 flex items-center justify-center'>
                  <Link className='ml-1 text-red-400' to='/register'>
                    Đăng ký
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

export default Login;
