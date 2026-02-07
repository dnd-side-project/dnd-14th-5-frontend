import type { AxiosRequestConfig } from 'axios';

import api from './instance';
import {
  type ApiRequestConfig,
  parseDataConfig,
  parseParamsConfig,
  parseWithSchema,
} from './schema';

const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';

export const resolveAccessTokenFromCookieHeader = (
  cookieHeader?: string | null,
): string | null => {
  if (!cookieHeader) {
    return null;
  }

  const match = cookieHeader.match(
    new RegExp(`(?:^|; )${ACCESS_TOKEN_COOKIE_NAME}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : null;
};

// 클라이언트 전용 헬퍼: SSR에서는 accessToken 전달 또는 서버 쿠키 파싱 필요.
const getAccessTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  return resolveAccessTokenFromCookieHeader(document.cookie);
};

const applyAccessToken = <TData>(
  axiosConfig: AxiosRequestConfig<TData>,
  accessToken?: string | null,
): AxiosRequestConfig<TData> => {
  const resolvedToken = accessToken ?? getAccessTokenFromCookie();

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
