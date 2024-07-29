import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios, { HttpStatusCode } from 'axios';
import config from 'config';
import { toast } from 'react-toastify';
import LocalStorage from './LocalStorage';

class Axios {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: config.BASE_URL,
      // timeout: 10 * 60 * 1000,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    this.instance.interceptors.request.use(
      (config) => {
        const accessToken = LocalStorage.get('accessToken');
        if (accessToken) {
          config.headers.authorization = `${accessToken}`;
        } else {
          delete config.headers.authorization;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.instance.interceptors.response.use(
      (response) => {
        // console.log(response);
        return response;
      },
      (error: AxiosError) => {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data;
          console.log(data);
          const message = data?.message || error.message;

          toast.error(message);
        }
        return Promise.reject(error);
      }
    );
  }

  // Read
  public async get<T = any, R = T>(url: string, config?: AxiosRequestConfig): Promise<R> {
    return new Promise((resolve, reject) => {
      this.instance
        .get<T, AxiosResponse<R>>(url, config)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response?.data));
    });
  }

  // Create
  public async post<R = any>(url: string): Promise<R>;
  public async post<D = any, R = any>(
    url: string,
    data: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R>;
  public async post<D = any, R = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      this.instance
        .post<D, AxiosResponse<R>>(url, data, config)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  // Update
  public async put<D = any, R = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return new Promise((resolve, reject) => {
      this.instance
        .put<D, AxiosResponse<R>>(url, data, config)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  }

  // Partial Update
  public async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.instance.patch<T>(url, data, config);
  }

  // Delete
  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return new Promise((resolve, reject) => {
      this.instance
        .delete<AxiosResponse<T>>(url, config)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error.response?.data));
    });
  }
}

const HttpClient = new Axios();
export default HttpClient;
