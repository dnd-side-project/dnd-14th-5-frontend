import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import axios, { AxiosHeaders, isAxiosError } from 'axios';

import { USER_ENDPOINTS } from '@/src/components/features/users/constants/url';

export interface ApiError {
  status: number | null;
  code: string | null;
  message: string;
  detail?: unknown;
}

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error(
      'NEXT_PUBLIC_API_BASE_URL is not set in environment variables.',
    );
  }

  console.warn(
    'NEXT_PUBLIC_API_BASE_URL is not set; requests will target the current host.',
  );
}

const api = axios.create({
  baseURL,
  timeout: 10_000,
  withCredentials: true,
});

const reissueClient = axios.create({
  baseURL,
  timeout: 10_000,
  withCredentials: true,
});

let reissuePromise: Promise<void> | null = null;

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

const rejectApiError = (error: AxiosError) => {
  return Promise.reject(toApiError(error));
};

const isReissueRequest = (config: RetryableRequestConfig) => {
  const requestUrl = config.url ?? '';
  return requestUrl.includes(USER_ENDPOINTS.reissue);
};

const shouldTryReissue = (
  status: number | null,
  config: RetryableRequestConfig,
) => {
  return status === 401 && !isReissueRequest(config) && !config._retry;
};

const runReissueOnce = async () => {
  if (!reissuePromise) {
    reissuePromise = reissueClient
      .post(USER_ENDPOINTS.reissue)
      .then(() => undefined)
      .finally(() => {
        reissuePromise = null;
      });
  }

  await reissuePromise;
};

const retryRequest = (config: RetryableRequestConfig) => {
  config._retry = true;
  return api.request(config);
};

api.interceptors.request.use(
  async (config) => attachServerCookieHeader(config),
  (error: AxiosError) => rejectApiError(error),
);

reissueClient.interceptors.request.use(
  async (config) => attachServerCookieHeader(config),
  (error: AxiosError) => rejectApiError(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalConfig = error.config as RetryableRequestConfig | undefined;
    const status = error.response?.status ?? null;

    if (!originalConfig) {
      return rejectApiError(error);
    }

    if (!shouldTryReissue(status, originalConfig)) {
      return rejectApiError(error);
    }

    try {
      await runReissueOnce();
      return retryRequest(originalConfig);
    } catch (reissueError) {
      if (isAxiosError(reissueError)) {
        return rejectApiError(reissueError);
      }

      return rejectApiError(error);
    }
  },
);

export default api;
