// import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from 'axios';
// import config from 'config';
// import { toast } from 'react-toastify';
// import LocalStorage from './LocalStorage';
// import type { HttpResponse } from 'types/http';
// import type { Auth } from 'types/auth';

// class Axios {
//   instance: AxiosInstance;
//   // private accessToken: string;
//   constructor() {
//     // this.accessToken = LocalStorage.get('accessToken');
//     this.instance = axios.create({
//       baseURL: config.BASE_URL,
//       // timeout: 1000,
//       headers: { 'Content-Type': 'application/json' }
//     });

//     // this.instance.interceptors.request.use(
//     //   // (config) => {
//     //   //   if (this.accessToken) {
//     //   //     config.headers.authorization = this.accessToken;
//     //   //   } else {
//     //   //     delete config.headers.authorization;
//     //   //   }
//     //   //   return config;
//     //   // },
//     //   // (error) => Promise.reject(error)
//     //   (config) => {
//     //     console.log(config);
//     //     const accessToken = LocalStorage.get('accessToken');
//     //     console.log(accessToken);
//     //     if (accessToken) {
//     //       config.headers.authorization = `${accessToken}`;
//     //     } else {
//     //       delete config.headers.authorization;
//     //     }
//     //     return config;
//     //   },
//     //   (error) => Promise.reject(error)
//     // );

//     this.instance.interceptors.response.use(
//       (response) => {
//         console.log(response);
//         return response;
//       },

//       (error: AxiosError) => {
//         if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
//           const data: any | undefined = error.response?.data;

//           const message = data.message || error.message;
//           toast.error(message);
//         }
//         return Promise.reject(error);
//       }
//     );
//   }
// }

// const HttpClient = new Axios().instance;
// export default HttpClient;
