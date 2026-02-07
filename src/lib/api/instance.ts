import type { AxiosError } from 'axios';
import axios from 'axios';

export type ApiError = {
  status: number | null;
  code: string | null;
  message: string;
  detail?: unknown;
};

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const api = axios.create({
  baseURL,
  timeout: 10_000,
});

const toApiError = (error: AxiosError): ApiError => {
  return {
    status: error.response?.status ?? null,
    code: error.code ?? null,
    message: error.message,
    detail: error.response?.data,
  };
};

api.interceptors.request.use(
  (config) => config,
  (error: AxiosError) => Promise.reject(toApiError(error)),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(toApiError(error)),
);

export default api;
