import { useMutation, useQuery } from '@tanstack/react-query';
import { addToCart, getPurchases, type PurchasesPayload } from 'api/purchase.api';
import noPurchase from 'assets/images/no-purchase.png';
import classNames from 'classnames';
import Paths from 'constants/paths';
import { purchasesStatus } from 'constants/purchaseStatus';
import useQueryParams from 'hooks/useQueryParams';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';
import type { PurchaseListStatus } from 'types/purchase';
import { formatCurrency, generateNameId } from 'utils/utils';

const purchaseTabs = [
  { status: purchasesStatus.all, name: 'Tất cả' },
  { status: purchasesStatus.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: purchasesStatus.waitForGetting, name: 'Chờ lấy hàng' },
  { status: purchasesStatus.inProgress, name: 'Đang giao' },
  { status: purchasesStatus.delivered, name: 'Đã giao' },
  { status: purchasesStatus.cancelled, name: 'Đã hủy' }
];

const HistoryPurchase = () => {
  const queryParams: { status?: string } = useQueryParams(); //lấy status ở trên url
  const status: number = Number(queryParams.status) || purchasesStatus.all;
  const navigate = useNavigate();

  const { data: purchasesCartData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => getPurchases({ status: status as Exclude<PurchaseListStatus, -1> })
  });

  const addToCartMutation = useMutation({
    mutationFn: (payload: PurchasesPayload) => addToCart(payload)
  });

  const purchasesCart = purchasesCartData?.data || [];

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: Paths.user.historyPurchase.route,

        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames(
        'flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center',
        {
          'border-b-orange text-orange': status === tab.status,
          'border-b-black/10 text-gray-900': status !== tab.status
        }
      )}
    >
      {tab.name}
    </Link>
  ));

  const buyNow = async (productId: string, buyCount: number) => {
    try {
      const res = await addToCartMutation.mutateAsync({
        buy_count: buyCount,
        product_id: productId
      });
      const purchase = res.data;
      // console.log(purchase);
      navigate(`/${Paths.cart.route}`, {
        state: {
          purchaseId: purchase._id
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>

          {purchasesCart && purchasesCart.length > 0 ? (
            <div>
              {purchasesCart?.map((purchase) => {
                const { name, _id, image, price_before_discount, price } = purchase.product;

                return (
                  <div
                    key={_id}
                    className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'
                  >
                    <Link
                      to={`${Paths.index}${generateNameId({ name, id: _id })}`}
                      className='flex'
                    >
                      <div className='flex-shrink-0'>
                        <img className='h-20 w-20 object-cover' src={image} alt={name} />
                      </div>
                      <div className='ml-3 flex-grow overflow-hidden'>
                        <div className='truncate'>{name}</div>
                        <div className='mt-3'>x{purchase.buy_count}</div>
                      </div>
                      <div className='ml-3 flex-shrink-0'>
                        <span className='truncate text-gray-500 line-through'>
                          ₫{formatCurrency(price_before_discount)}
                        </span>
                        <span className='ml-2 truncate text-orange'>₫{formatCurrency(price)}</span>
                      </div>
                    </Link>
                    <div className='flex justify-end'>
                      <div>
                        <span>Tổng giá tiền</span>
                        <span className='ml-4 text-xl text-orange'>
                          ₫{formatCurrency(price * purchase.buy_count)}
                        </span>
                      </div>
                    </div>
                    <div className='flex justify-end mt-3'>
                      <button
                        onClick={() => buyNow(_id, purchase.buy_count)}
                        className='flex ml-4 h-10 min-w-[10rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                      >
                        Mua lại
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className='flex h-[500px] flex-col items-center justify-center p-2'>
              <img src={noPurchase} alt='no purchase' className='h-24 w-24' />
              <div className='mt-3 capitalize'>Chưa có đơn hàng</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoryPurchase;
