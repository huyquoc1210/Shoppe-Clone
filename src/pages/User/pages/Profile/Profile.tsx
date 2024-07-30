import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getProfile, updateProfile, uploadAvatar } from 'api/user.api';
import Button from 'components/Button';
import Form from 'components/Form/Form';
import FormInput from 'components/Form/FormInput';
import FromInputFile from 'components/Form/FormInputFile';
import PageTitle from 'components/Pages/PageTitle';
import useAuth from 'hooks/useAuth';
import DateSelect from 'pages/User/components/DateSelect';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import type { HttpErrorResponse } from 'types/http';
import { axiosUnprocessableEntityError, getAvatarUrl } from 'utils/utils';
import Validator from 'utils/Validator';
import * as yup from 'yup';

interface FormData {
  address: string;
  phone: string;
  date_of_birth: Date;
  name: string;
  avatar: string;
}

const schema = yup.object({
  address: Validator.string(),
  phone: Validator.phone(),
  date_of_birth: Validator.birthday(),
  name: Validator.string(),
  avatar: Validator.avatar()
});

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const [file, setFile] = useState<File>();
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : '';
  }, [file]);
  const { data: profileData, refetch } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile
  });

  const updateProfileMutation = useMutation({
    mutationFn: updateProfile
  });
  const profile = profileData?.data;
  const uploadAvatarMutation = useMutation({
    mutationFn: uploadAvatar
  });

  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault()
  });

  const handleSubmit = async (data: FormData) => {
    try {
      let avatarName = data.avatar;

      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const uploadRes = await uploadAvatarMutation.mutateAsync(formData);
        // console.log(uploadRes);
        avatarName = uploadRes.data;
        form.setValue('avatar', avatarName);
      }

      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName
      });

      updateUserProfile(res.data);
      refetch();
      toast.success(res.message, { autoClose: 1000 });
    } catch (error) {
      if (
        axiosUnprocessableEntityError<
          HttpErrorResponse<
            Omit<FormData, 'date_of_birth'> & {
              date_of_birth?: string;
            }
          >
        >(error)
      ) {
        const formError = error.response?.data.data;

        if (formError?.phone) {
          form.setError('phone', { message: formError.phone, type: 'Server' });
        }
        if (formError?.address) {
          form.setError('address', { message: formError.address, type: 'Server' });
        }
        if (formError?.date_of_birth) {
          form.setError('date_of_birth', { message: formError.date_of_birth, type: 'Server' });
        }
        if (formError?.name) {
          form.setError('name', { message: formError.name, type: 'Server' });
        }
        if (formError?.avatar) {
          form.setError('avatar', { message: formError.avatar, type: 'Server' });
        }
      }
    }
  };

  const handleChangeFile = (file?: File) => {
    setFile(file);
  };

  console.log(file);

  // useEffect(() => {
  //   return () => {
  //     file && URL.revokeObjectURL(file);
  //   };
  // }, []);

  useEffect(() => {
    if (profile) {
      form.setValue('phone', profile.phone || '');
      form.setValue('address', profile.address || '');
      form.setValue('avatar', profile.avatar || '');
      form.setValue(
        'date_of_birth',
        profile.date_of_birth ? new Date(profile.date_of_birth) : new Date(1970, 0, 1)
      );
      form.setValue('name', profile.name || '');
    }
  }, [profile, form.setValue]);
  // console.log(user);

  return (
    <PageTitle title='Hồ sơ'>
      <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
        <div className='border-b border-b-gray-200 py-6'>
          <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ Sơ Của Tôi</h1>
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
            <div className='flex flex-col flex-wrap sm:flex-row '>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Email</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <div className='pt-3 text-gray-700'>huyquoc@gmail.com</div>
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row '>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right '>Tên</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <FormInput<FormData>
                  className='mt-3'
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  name='name'
                  placeholder='Tên'
                  type='text'
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row '>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right '>
                Số điện thoại
              </div>
              <div className='sm:w-[80%] sm:pl-5'>
                <FormInput<FormData>
                  className='mt-3'
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  name='phone'
                  placeholder='Số điện thoại'
                  type='text'
                />
              </div>
            </div>
            <div className='mt-2 flex flex-col flex-wrap sm:flex-row '>
              <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right '>Địa chỉ</div>
              <div className='sm:w-[80%] sm:pl-5'>
                <FormInput<FormData>
                  className='mt-3'
                  classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                  name='address'
                  placeholder='Địa chỉ'
                  type='text'
                />
              </div>
            </div>
            <DateSelect<FormData> name='date_of_birth' />
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
          <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
            <div className='flex flex-col items-center'>
              <div className='my-5 h-24 w-24'>
                <img
                  src={previewImage || getAvatarUrl(user?.avatar)}
                  alt='avatar'
                  className='h-full w-full rounded-full object-cover'
                />
              </div>
              <FromInputFile onChange={handleChangeFile} />
              <div className='mt-3 text-gray-400'>
                <div>Dụng lượng file tối đa 1 MB</div>
                <div>Định dạng:.JPEG, .PNG</div>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </PageTitle>
  );
};

export default Profile;
