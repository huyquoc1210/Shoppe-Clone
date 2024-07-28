import { yupResolver } from '@hookform/resolvers/yup';
import Button from 'components/Button';
import Form from 'components/Form/Form';
import FormInput from 'components/Form/FormInput';
import { useForm } from 'react-hook-form';
import Validator from 'utils/Validator';
import * as yup from 'yup';

interface FormData {
  address: string;
}

const schema = yup.object({
  address: Validator.string()
});

const Profile = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: schema.getDefault()
  });

  const handleSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>
          Hồ Sơ Của Tôi
        </h1>
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
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              Email
            </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='pt-3 text-gray-700'>huyquoc@gmail.com</div>
            </div>
          </div>

          <div className='mt-2 flex flex-col flex-wrap sm:flex-row '>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              Địa chỉ
            </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <FormInput
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='address'
                placeholder='Địa chỉ'
                type='text'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row '>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              Số điện thoại
            </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <FormInput
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='address'
                placeholder='Số điện thoại'
                type='text'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row '>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              Tên
            </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <FormInput
                className='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'
                name='address'
                placeholder='Tên'
                type='text'
              />
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row '>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>
              Sinh nhật
            </div>
            <div className='sm:w-[80%] sm:pl-5'>
              <div className='flex justify-between'>
                <select
                  name=''
                  id=''
                  className='h-10 w-[32%] rounded-sm border-black/10 px-3'
                >
                  <option disabled>Ngày</option>
                </select>
                <select
                  name=''
                  id=''
                  className='h-10 w-[32%] rounded-sm border-black/10 px-3'
                >
                  <option disabled>Tháng</option>
                </select>
                <select
                  name=''
                  id=''
                  className='h-10 w-[32%] rounded-sm border-black/10 px-3'
                >
                  <option disabled>Năm</option>
                </select>
              </div>
            </div>
          </div>
          <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
            <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right' />
            <div className='sm:w-[80%] sm:pl-5'>
              <Button
                className='flex h-9 items-center rounded-sm bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
                type='submit'
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
                src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078'
                alt=''
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <input type='file' className='hidden' accept='.jpg,.png,.jpeg' />
            <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
              Chọn ảnh
            </button>
            <div className='mt-3 text-gray-400'>
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Profile;
