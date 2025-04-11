import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityWhereInput } from '../types/prisma.types';

// apps/api/src/common/dto/query-params.dto.ts
export interface QueryParams<K extends Prisma.ModelName = any> {
  where?: EntityWhereInput<K>;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedQueryParams extends QueryParams {
  page?: number;
  limit?: number;
}
