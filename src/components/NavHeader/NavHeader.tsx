import { useQueryClient } from '@tanstack/react-query';
import Popover from 'components/Popover';
import Paths from 'constants/paths';
import { purchasesStatus } from 'constants/purchaseStatus';
import useAuth from 'hooks/useAuth';
import { Link } from 'react-router-dom';

const NavHeader = () => {
  const queryClient = useQueryClient();
  const { logout, user, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    queryClient.removeQueries({
      queryKey: ['purchases', { status: purchasesStatus.inCart }]
    });
  };

  return (
    <div className='flex justify-end'>
      <Popover
        className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
        as='span'
        renderPopover={
          <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
            <div className='flex flex-col py-2 pr-28 pl-3'>
              <button className='py-2 px-3 text-left hover:text-orange'>
                Tiếng Việt
              </button>
              <button className='mt-2 py-2 px-3 text-left hover:text-orange'>
                English
              </button>
            </div>
          </div>
        }
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
          />
        </svg>
        <span>Tiếng Việt</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='size-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m19.5 8.25-7.5 7.5-7.5-7.5'
          />
        </svg>
      </Popover>

      {isAuthenticated && (
        <Popover
          className='ml-5 flex items-center py-1 hover:text-gray-300 cursor-pointer'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <Link
                to={Paths.user.profile.route}
                className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 text-left'
              >
                Tài khoản của tôi
              </Link>
              <Link
                to={Paths.user.historyPurchase.route}
                className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 text-left'
              >
                Đơn mua
              </Link>
              <button
                onClick={handleLogout}
                className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
              >
                Đăng xuất
              </button>
            </div>
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
            />
          </svg>
          <span>{user?.email}</span>
        </Popover>
      )}

      {!isAuthenticated && (
        <div className='flex items-center'>
          <Link to='/register' className='mx-3 capitalize hover:text-white/70'>
            Đăng ký
          </Link>
          <div className='border-r-[1px] bordre-r-white/40 h4' />
          <Link to='/login' className='mx-3 capitalize hover:text-white/70'>
            Đăng nhập
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavHeader;
