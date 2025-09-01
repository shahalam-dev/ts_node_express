export interface Meta {
  page?: number;
  limit?: number;
  total?: number;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  meta?: Meta;
}

export function successResponse<T>(
  data: T,
  message = "Request successful",
  meta?: Meta,
): ApiResponse<T> {
  return {
    success: true,
    message,
    data,
    meta,
  };
}

export function errorResponse(message: string, error?: string): ApiResponse<null> {
  return {
    success: false,
    message,
    error,
  };
}
