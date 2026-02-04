import { isAxiosError } from 'axios';

export const getAxiosErrorMessage = (error: unknown) => {
  if (!isAxiosError(error)) return null;

  const status = error.response?.status;
  const responseData = error.response?.data;

  if (responseData && typeof responseData === 'object') {
    const maybeMessage = (responseData as { message?: string }).message;
    if (typeof maybeMessage === 'string' && maybeMessage.trim().length > 0) {
      return status ? `[${status}] ${maybeMessage}` : maybeMessage;
    }
  }

  if (typeof error.message === 'string' && error.message.trim().length > 0) {
    return status ? `[${status}] ${error.message}` : error.message;
  }

  return status ? `요청 중 오류가 발생했습니다. (status: ${status})` : null;
};

export const getErrorMessage = (error: unknown) => {
  const axiosMessage = getAxiosErrorMessage(error);
  if (axiosMessage) return axiosMessage;

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return '요청 중 알 수 없는 오류가 발생했습니다.';
};
