// apps/api/src/common/dto/query-params.dto.ts
export interface QueryParams {
  where?: Record<string, any>;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedQueryParams extends QueryParams {
  page?: number;
  limit?: number;
}
