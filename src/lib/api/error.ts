export interface ApiError {
  status: number | null;
  code: string | null;
  message: string;
  detail?: unknown;
}

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error
  );
};
