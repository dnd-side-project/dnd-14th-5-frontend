import type { AxiosRequestConfig } from 'axios';
import type { ZodType } from 'zod';

type Schema<T> = ZodType<T>;

export type ApiRequestConfig<
  TData = unknown,
  TParams = unknown,
  TResponse = unknown,
> = Omit<AxiosRequestConfig<TData>, 'params'> & {
  params?: TParams;
  dataSchema?: Schema<TData>;
  paramsSchema?: Schema<TParams>;
  responseSchema?: Schema<TResponse>;
};

export const parseWithSchema = <T>(
  schema: Schema<T> | undefined,
  value: unknown,
): T => {
  if (!schema) {
    return value as T;
  }

  return schema.parse(value);
};

export const parseDataConfig = <TRequest, TResponse>(
  data: TRequest | undefined,
  config?: ApiRequestConfig<TRequest, never, TResponse>,
) => {
  const { dataSchema, responseSchema, ...axiosConfig } = config ?? {};
  const parsedData = parseWithSchema(dataSchema, data);

  return { axiosConfig, parsedData, responseSchema };
};

export const parseParamsConfig = <TParams, TResponse>(
  params: TParams | undefined,
  config?: ApiRequestConfig<never, TParams, TResponse>,
) => {
  const { paramsSchema, responseSchema, ...axiosConfig } = config ?? {};
  const parsedParams = parseWithSchema(paramsSchema, params);

  return { axiosConfig, parsedParams, responseSchema };
};
