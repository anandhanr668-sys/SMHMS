// shared/types/common.types.ts

export type UUID = string;

export type ISODateString = string;

export interface BaseEntity {
  id: UUID;
  tenantId: UUID;
  createdAt: ISODateString;
  updatedAt: ISODateString;
}

export interface PaginationQuery {
  page?: number;
  limit?: number;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
