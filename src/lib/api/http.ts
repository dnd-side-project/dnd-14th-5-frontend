import type { AxiosRequestConfig } from 'axios';

import api from './instance';
import {
  type ApiRequestConfig,
  parseDataConfig,
  parseParamsConfig,
  parseWithSchema,
} from './schema';

const ACCESS_TOKEN_COOKIE_NAME = 'accessToken';

const getAccessTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') {
    return null;
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${ACCESS_TOKEN_COOKIE_NAME}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : null;
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

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Send a PATCH request to the specified URL.
 *
 * @template TRequest, TResponse

/*******  f1acf508-ea2c-47cf-9471-0bc71d4ec840  *******/
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
