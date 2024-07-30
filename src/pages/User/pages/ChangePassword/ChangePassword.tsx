import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { updateProfile } from 'api/user.api';
import Button from 'components/Button';
import Form from 'components/Form/Form';
import FormInput from 'components/Form/FormInput';
import PageTitle from 'components/Pages/PageTitle';
import omit from 'lodash.omit';
import { useEffect } from 'react';
import { useForm, useFormState, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { HttpErrorResponse } from 'types/http';
import { axiosUnprocessableEntityError } from 'utils/utils';
import Validator from 'utils/Validator';
import * as yup from 'yup';

interface FormData {
  password: string;
  new_password: string;
  confirm_password: string;
}

const schema = yup.object({
  password: Validator.string().required(),
  new_password: Validator.string().required(),
  confirm_password: Validator.string()
    .required()
    .test({
      name: 'confirm_password',
      message: 'Mật khẩu không trùng khớp',
      test: (value, context) => {
        const { new_password } = context.parent;
        if (value && new_password) {
          return value === new_password;
        }
        return true;
      }
    })
});

const ChangePassword = () => {
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile
  });

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault()
  });

  const control = form.control;

  const { touchedFields } = useFormState({
    control
  });

  const newPassword = useWatch({ control, name: 'new_password' });

  useEffect(() => {
    if (touchedFields.confirm_password) {
      form.trigger('confirm_password');
    }
  }, [newPassword, touchedFields]);

  const handleSubmit = async (data: FormData) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']));

      toast.success(res.message, { autoClose: 1000 });
    } catch (error) {
      if (axiosUnprocessableEntityError<HttpErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data;

        if (formError?.password) {
          console.log(formError.password);
          form.setError('password', { message: formError.password, type: 'Server' });
        }
        if (formError?.new_password) {
          form.setError('new_password', { message: formError.new_password, type: 'Server' });
        }
      }
    }
  };

  return (
    <PageTitle title='Thay đổi mật khẩu'>
      <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
        <div className='border-b border-b-gray-200 py-6'>
          <h1 className='text-lg font-medium capitalize text-gray-900'>Đổi Mật Khẩu</h1>
          <div className='mt-1 text-sm text-gray-700'>
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </div>
        </div>
        <Form
          form={form}
          onSubmit={handleSubmit}
          className='mt-8 flex flex-col-reverse md:flex-row md:items-start'
        >
          <div className='mt-6 flex-grow md:mt-0 md:pr-12'>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row '>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right '>Password</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <FormInput<FormData>
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  name='password'
                  placeholder='PassWord'
                  type='password'
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row '>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right '>New Password</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <FormInput<FormData>
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  name='new_password'
                  placeholder='NewPassword'
                  type='password'
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row '>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right '>
                Confirm Password
              </div>
              <div className='sm:w-[80%] sm:pl-5'>
                <FormInput<FormData>
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  name='confirm_password'
                  placeholder='ConfirmPassword'
                  type='password'
                />
              </div>
            </div>

            <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
              <div className='sm:w-[80%] sm:pl-5'>
                <Button
                  className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                  type='submit'
                  isLoading={updateProfileMutation.isPending}
                  disabled={updateProfileMutation.isPending}
                >
                  Lưu
                </Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </PageTitle>
  );
};

export default ChangePassword;
