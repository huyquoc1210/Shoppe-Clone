import Endpoints from 'constants/endpoints';
import type { HttpResponse } from 'types/http';
import type { Product, ProductList, ProductListConfig } from 'types/product';
import HttpClient from 'utils/HttpClient';

// Get list Product
export const getProducts = async (params: ProductListConfig) => {
  return HttpClient.get<ProductListConfig, HttpResponse<ProductList>>(Endpoints.products, {
    params
  });
};

// Get a Product
export const getProduct = async (id?: string) => {
  return HttpClient.get<HttpResponse<Product>>(`${Endpoints.products}/${id}`);
};

// Get a Product
export const getProductDetail = async (id?: string) => {
  return HttpClient.get<HttpResponse<Product>>(`${Endpoints.products}/${id}`);
};
