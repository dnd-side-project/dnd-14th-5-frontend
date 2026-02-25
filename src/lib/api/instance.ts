import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosHeaders } from 'axios';

import { API_BASE_URL } from '@/src/lib/config/env';

export interface ApiError {
  status: number | null;
  code: string | null;
  message: string;
  detail?: unknown;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
  withCredentials: true,
});

const toApiError = (error: AxiosError): ApiError => {
  return {
    status: error.response?.status ?? null,
    code: error.code ?? null,
    message: error.message,
    detail: error.response?.data,
  };
};

const attachServerCookieHeader = async (config: InternalAxiosRequestConfig) => {
  if (typeof window !== 'undefined') {
    return config;
  }

  const headers = AxiosHeaders.from(config.headers);
  const hasCookieHeader = headers.has('cookie');

  if (hasCookieHeader) {
    return config;
  }

  try {
    const { cookies } = await import('next/headers');
    const cookieHeader = (await cookies()).toString();

    if (!cookieHeader) {
      return config;
    }

    headers.set('cookie', cookieHeader);
    config.headers = headers;
    return config;
  } catch {
    return config;
  }
};

api.interceptors.request.use(
  async (config) => attachServerCookieHeader(config),
  (error: AxiosError) => Promise.reject(toApiError(error)),
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => Promise.reject(toApiError(error)),
);

export default api;
