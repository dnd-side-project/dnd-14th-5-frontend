import type { AxiosRequestConfig } from 'axios';

import api from './instance';
import {
  type ApiRequestConfig,
  parseDataConfig,
  parseParamsConfig,
  parseWithSchema,
} from './schema';

const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';

// 클라이언트 전용 헬퍼: SSR에서는 accessToken을 직접 전달해야 함.
const getAccessTokenFromLocalStorage = (): string | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  return window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
};

const applyAccessToken = <TData>(
  axiosConfig: AxiosRequestConfig<TData>,
  accessToken?: string | null,
): AxiosRequestConfig<TData> => {
  const resolvedToken = accessToken ?? getAccessTokenFromLocalStorage();

  if (!resolvedToken) {
    return axiosConfig;
  }

  return {
    ...axiosConfig,
    headers: {
      ...axiosConfig.headers,
      Authorization: `Bearer ${resolvedToken}`,
    },
  };
};

export const get = async <TResponse, TParams = never>(
  url: string,
  config?: ApiRequestConfig<never, TParams, TResponse>,
): Promise<TResponse> => {
  const { params } = config ?? {};
  const { axiosConfig, parsedParams, responseSchema, accessToken } =
    parseParamsConfig(params, config);
  const resolvedConfig = applyAccessToken(axiosConfig, accessToken);
  const response = await api.get<TResponse>(url, {
    ...resolvedConfig,
    params: parsedParams,
  });

  return parseWithSchema(responseSchema, response.data);
};

export const post = async <TRequest, TResponse>(
  url: string,
  data?: TRequest,
  config?: ApiRequestConfig<TRequest, never, TResponse>,
): Promise<TResponse> => {
  const { axiosConfig, parsedData, responseSchema, accessToken } =
    parseDataConfig(data, config);
  const resolvedConfig = applyAccessToken(axiosConfig, accessToken);
  const response = await api.post<TResponse>(url, parsedData, resolvedConfig);

  return parseWithSchema(responseSchema, response.data);
};

export const patch = async <TRequest, TResponse>(
  url: string,
  data?: TRequest,
  config?: ApiRequestConfig<TRequest, never, TResponse>,
): Promise<TResponse> => {
  const { axiosConfig, parsedData, responseSchema, accessToken } =
    parseDataConfig(data, config);
  const resolvedConfig = applyAccessToken(axiosConfig, accessToken);
  const response = await api.patch<TResponse>(url, parsedData, resolvedConfig);

  return parseWithSchema(responseSchema, response.data);
};

export const del = async <TRequest, TResponse>(
  url: string,
  data?: TRequest,
  config?: ApiRequestConfig<TRequest, never, TResponse>,
): Promise<TResponse> => {
  const { axiosConfig, parsedData, responseSchema, accessToken } =
    parseDataConfig(data, config);
  const resolvedConfig = applyAccessToken(axiosConfig, accessToken);
  const response = await api.delete<TResponse>(url, {
    ...resolvedConfig,
    data: parsedData,
  });

  return parseWithSchema(responseSchema, response.data);
};
