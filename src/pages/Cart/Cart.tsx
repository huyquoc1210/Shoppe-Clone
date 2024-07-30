import { useMutation, useQuery } from '@tanstack/react-query';
import { buyPurchases, deletePurchases, getPurchases, updatePurchases } from 'api/purchase.api';
import Button from 'components/Button';
import QuantityController from 'components/QuantityController';
import Paths from 'constants/paths';
import { purchasesStatus } from 'constants/purchaseStatus';
import useExtendPurchases from 'hooks/useExtendPurchases';
import { produce } from 'immer';
import keyBy from 'lodash.keyby';
import { useEffect, useMemo, type ChangeEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Purchase } from 'types/purchase';
import { formatCurrency, generateNameId } from 'utils/utils';
import noProduct from 'assets/images/no-product.png';
import PageTitle from 'components/Pages/PageTitle';

const Cart = () => {
  const { extendPurchases, setExtendPurchases } = useExtendPurchases();
  const { data: purchasesCartData, refetch } = useQuery({
    queryKey: ['purchases', { status: purchasesStatus.inCart }],
    queryFn: () => getPurchases({ status: purchasesStatus.inCart })
  });

  const { mutate: updateMutation } = useMutation({
    mutationFn: updatePurchases,
    onSuccess: () => {
      refetch();
    }
  });

  const { mutate: deleteMutation } = useMutation({
    mutationFn: deletePurchases,
    onSuccess: () => {
      refetch();
    }
  });

  const { mutate: buyMutation } = useMutation({
    mutationFn: buyPurchases,
    onSuccess: (data) => {
      refetch();
      toast.success(data.message, {
        position: 'top-center',
        autoClose: 1000
      });
    }
  });

  const location = useLocation();
  const chosenPurchaseId = ((location.state as { purchaseId: string }) || null)?.purchaseId;
  const purchasesCart = purchasesCartData?.data;

  const isAllChecked = useMemo(
    () => extendPurchases.every((purchase) => purchase.checked),
    [extendPurchases]
  );
  const checkedPurchases = useMemo(
    () => extendPurchases.filter((purchase) => purchase.checked),
    [extendPurchases]
  );

  const checkedPurchasesCount = checkedPurchases.length;

  const totalCheckPurchasePrice = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return result + current.product.price * current.buy_count;
      }, 0),
    [checkedPurchases]
  );

  const totalCheckPurchaseDiscount = useMemo(
    () =>
      checkedPurchases.reduce((result, current) => {
        return (
          result +
          (current.product.price_before_discount - current.product.price) * current.buy_count
        );
      }, 0),
    [checkedPurchases]
  );

  useEffect(() => {
    setExtendPurchases((prev) => {
      const extendPurchasesObject = keyBy(prev, '_id');
      console.log(extendPurchasesObject);
      return (
        purchasesCart?.map((purchase) => {
          const isChosenPurchaseFormLocation = chosenPurchaseId === purchase._id;
          return {
            ...purchase,
            disabled: false,
            checked:
              isChosenPurchaseFormLocation || Boolean(extendPurchasesObject[purchase._id]?.checked)
          };
        }) || []
      );
    });
  }, [purchasesCart]);

  const handleQuantity = (purchaseIndex: number, value: number, enabled: boolean) => {
    if (!enabled) return;
    const purchase = extendPurchases[purchaseIndex];
    setExtendPurchases(
      produce((draft) => {
        draft[purchaseIndex].disabled = true;
      })
    );

    updateMutation({ product_id: purchase.product._id, buy_count: value });
  };

  const handleChecked = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    setExtendPurchases(
      produce((draft) => {
        draft[index].checked = event.target.checked;
      })
    );
  };

  const handleCheckAll = () => {
    setExtendPurchases((prev) =>
      prev.map((purchase) => {
        console.log(purchase);
        return {
          ...purchase,
          checked: !isAllChecked
        };
      })
    );
  };

  const handleTypeQuantity = (purchasesIndex: number) => (value: number) => {
    setExtendPurchases(
      produce((draft) => {
        draft[purchasesIndex].buy_count = value;
      })
    );
  };

  const handleRemove = (purchasesIndex: number) => () => {
    const purchaseId = extendPurchases[purchasesIndex]._id;
    deleteMutation([purchaseId]);
  };

  const handleRemoveManyPurchases = () => {
    const purchaseIds = checkedPurchases.map((purchase) => purchase._id);
    deleteMutation(purchaseIds);
  };

  const handleBuyCount = () => {
    if (checkedPurchasesCount > 0) {
      const payload = checkedPurchases.map((purchase) => {
        console.log(purchase);
        return {
          product_id: purchase.product._id,
          buy_count: purchase.buy_count
        };
      });
      buyMutation(payload);
    }
  };

  useEffect(() => {
    return window.history.replaceState(null, '');
  }, []);

  return (
    <PageTitle title='Cart'>
      <div className='bg-neutral-100 py-16'>
        <div className='container'>
          {extendPurchases.length > 0 ? (
            <>
              <div className='overflow-auto'>
                <div className='min-w-[1000px]'>
                  <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow'>
                    <div className='col-span-6'>
                      <div className='flex items-center'>
                        <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                          <input
                            type='checkbox'
                            className='h-5 w-5 accent-orange'
                            onChange={handleCheckAll}
                            checked={isAllChecked}
                          />
                        </div>
                        <div className='flex-grow text-black'>Sản phẩm</div>
                      </div>
                    </div>
                    <div className='col-span-6'>
                      <div className='grid grid-cols-5 text-center'>
                        <div className='col-span-2'>Đơn giá</div>
                        <div className='col-span-1'>Số lượng</div>
                        <div className='col-span-1'>Số tiền</div>
                        <div className='col-span-1'>Thao tác</div>
                      </div>
                    </div>
                  </div>
                  <div className='my-3 rounded-sm bg-white p-5 shadow'>
                    {extendPurchases?.map((purchase, index) => (
                      <div
                        key={purchase._id}
                        className='mb-5 grid grid-cols-12 items-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-center text-sm text-gray-500 first:mt-0'
                      >
                        <div className='col-span-6'>
                          <div className='flex'>
                            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                              <input
                                type='checkbox'
                                className='h-5 w-5 accent-orange'
                                checked={purchase.checked}
                                onChange={handleChecked(index)}
                              />
                            </div>
                            <div className='flex-grow'>
                              <div className='flex'>
                                <Link
                                  className='h-20 w-20 flex-shrink-0 overflow-hidden'
                                  to={`${Paths.index}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                                >
                                  <img alt={purchase.product.name} src={purchase.product.image} />
                                </Link>
                                <div className='flex-grow px-2 pt-1 pb-2'>
                                  <Link
                                    to={`${Paths.index}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                                    className='text-left line-clamp-2'
                                  >
                                    {purchase.product.name}
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='col-span-6'>
                          <div className='grid grid-cols-5 items-center'>
                            <div className='col-span-2'>
                              <div className='flex items-center justify-center'>
                                <span className='text-gray-300 line-through'>
                                  ₫{formatCurrency(purchase.product.price_before_discount)}
                                </span>
                                <span className='ml-3'>
                                  ₫{formatCurrency(purchase.product.price)}
                                </span>
                              </div>
                            </div>
                            <div className='col-span-1'>
                              <QuantityController
                                max={purchase.product.quantity}
                                value={purchase.buy_count}
                                classNameWrapper='flex items-center'
                                onIncrease={(value) =>
                                  handleQuantity(index, value, value <= purchase.product.quantity)
                                }
                                onDecrease={(value) => handleQuantity(index, value, value >= 1)}
                                onType={handleTypeQuantity(index)}
                                onFocusOut={(value) =>
                                  handleQuantity(
                                    index,
                                    value,
                                    value >= 1 &&
                                      value <= purchase.product.quantity &&
                                      value !== (purchasesCart as Purchase[])[index].buy_count
                                  )
                                }
                                disabled={purchase.disabled}
                              />
                            </div>
                            <div className='col-span-1'>
                              <span className='text-orange'>
                                ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                              </span>
                            </div>
                            <div onClick={handleRemove(index)} className='col-span-1'>
                              <button className='bg-none text-black transition-colors hover:text-orange'>
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='sticky bottom-0 z-10 mt-8 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='h-5 w-5 accent-orange'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <button onClick={handleCheckAll} className='mx-3 border-none bg-none'>
                    Chọn tất cả ({extendPurchases.length})
                  </button>
                  <button onClick={handleRemoveManyPurchases} className='mx-3 border-none bg-none'>
                    Xóa
                  </button>
                </div>

                <div className='mt-5 flex flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center'>
                  <div>
                    <div className='flex items-center sm:justify-end'>
                      <div>Tổng thanh toán ({checkedPurchasesCount} sản phẩm):</div>
                      <div className='ml-2 text-2xl text-orange'>
                        ₫{formatCurrency(totalCheckPurchasePrice)}
                      </div>
                    </div>
                    <div className='flex items-center text-sm sm:justify-end'>
                      <div className='text-gray-500'>Tiết kiệm</div>
                      <div className='ml-6 text-orange'>
                        ₫{formatCurrency(totalCheckPurchaseDiscount)}
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={handleBuyCount}
                    className='mt-5 flex h-10 w-52 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'
                  >
                    Mua hàng
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className='text-center'>
              <img src={noProduct} alt='no purchase' className='mx-auto h-24 w-24' />
              <div className='mt-5 font-bold text-gray-400'>Giỏ hàng của bạn còn trống</div>
              <div className='mt-5 text-center'>
                <Link
                  to={Paths.index}
                  className=' rounded-sm bg-orange px-10 py-2  uppercase text-white transition-all hover:bg-orange/80'
                >
                  Mua ngay
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTitle>
  );
};

export default Cart;
