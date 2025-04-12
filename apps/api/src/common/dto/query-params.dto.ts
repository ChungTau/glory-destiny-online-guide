// apps/api/src/common/dto/query-params.dto.ts
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityWhereInput } from '../types/prisma.types';

export interface QueryParams<K extends Prisma.ModelName> {
  where?: EntityWhereInput<K>;
  sort?: string;
  order?: 'asc' | 'desc';
}

export interface PaginatedQueryParams<K extends Prisma.ModelName>
  extends QueryParams<K> {
  page?: number;
  limit?: number;
}
