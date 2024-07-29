import Endpoints from 'constants/endpoints';
import type { HttpResponse } from 'types/http';
import type { Purchase, PurchaseListStatus } from 'types/purchase';
import HttpClient from 'utils/HttpClient';

export interface PurchasesPayload {
  product_id: string;
  buy_count: number;
}

interface Status {
  status: PurchaseListStatus;
}

export const addToCart = async (payload: PurchasesPayload) => {
  return HttpClient.post<typeof payload, HttpResponse<Purchase>>(
    `${Endpoints.purchases}/add-to-cart`,
    payload
  );
};

export const getPurchases = async (params: Status) => {
  return HttpClient.get<HttpResponse<Purchase[]>>(Endpoints.purchases, { params });
};

export const buyPurchases = async (payload: PurchasesPayload[]) => {
  return HttpClient.post<typeof payload, HttpResponse<Purchase[]>>(
    `${Endpoints.purchases}/buy-products`,
    payload
  );
};

export const updatePurchases = async (payload: PurchasesPayload) => {
  return HttpClient.put<typeof payload, HttpResponse<Purchase[]>>(
    `${Endpoints.purchases}/update-purchase`,
    payload
  );
};

export const deletePurchases = async (id: string[]) => {
  return HttpClient.delete<HttpResponse<{ delete_count: number }>>(Endpoints.purchases, {
    data: id
  });
};
