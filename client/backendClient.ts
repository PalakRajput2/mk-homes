// client/backendClient.ts
import { MESSAGE_TYPE, showMessage } from '@/utils/notify';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type TErrorFromServer = {
  success: boolean;
  message: string;
  data: any;
};

export const backendClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, 
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});


export const setAuthToken = (token: string) => {
  backendClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
  }
};


if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    backendClient.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }
}


const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  const msg = (error.response?.data as TErrorFromServer | undefined)?.message;
  if (!!msg && error.config?.method !== "get") {
    showMessage(msg, MESSAGE_TYPE.ERROR);
  }
  if(error?.response?.status === 401){
    if(typeof window !== undefined){
      window.location.href = '/';
    }
  }
  return Promise.reject(error);
};

const onRequest = (requestConfig: InternalAxiosRequestConfig) => requestConfig;
backendClient.interceptors.response.use(onResponse, onResponseError);
backendClient.interceptors.request.use(onRequest);