import Endpoints from 'constants/endpoints';
import type { Category } from 'types/category';
import type { HttpResponse } from 'types/http';
import HttpClient from 'utils/HttpClient';

export const getCategories = () => {
  return HttpClient.get<HttpResponse<Category[]>>(Endpoints.category);
};
