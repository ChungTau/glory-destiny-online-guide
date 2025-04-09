// apps/api/src/common/types/prisma.types.ts
import { Prisma } from '@glory-destiny-online-guide/prisma';

export interface Identifiable {
  id: number;
}

// 創建單個實體嘅輸入類型
export type EntityCreateInput<T extends Prisma.ModelName> = {
  [K in T]: Prisma.TypeMap['model'][K]['operations']['create']['args']['data'];
}[T];

// 批量創建實體嘅輸入類型
export type EntityCreateManyInput<T extends Prisma.ModelName> = {
  [K in T]: Prisma.TypeMap['model'][K]['operations']['createMany']['args']['data'];
}[T];

// 更新單個實體嘅輸入類型
export type EntityUpdateInput<T extends Prisma.ModelName> = {
  [K in T]: Prisma.TypeMap['model'][K]['operations']['update']['args']['data'];
}[T];

// 批量更新實體嘅輸入類型
export type EntityUpdateManyInput<T extends Prisma.ModelName> = {
  [K in T]: Prisma.TypeMap['model'][K]['operations']['updateMany']['args']['data'];
}[T];

export type EntityWhereInput<T extends Prisma.ModelName> = {
  [K in T]: Prisma.TypeMap['model'][K]['operations']['findMany']['args']['where'];
}[T];

// 查詢結果類型（帶 include 或 select）
export type EntityPayload<
  T extends Prisma.ModelName,
  Args extends { include?: any; select?: any } = {},
> = Identifiable & // 強制包含 id
  Prisma.TypeMap['model'][T]['payload'] &
  (Args extends { include: infer I }
    ? {
        [K in keyof I & keyof Prisma.TypeMap['model'][T]['fields']]: I[K] extends true
          ? Prisma.TypeMap['model'][T]['fields'][K] extends { type: infer R }
            ? R
            : never
          : I[K] extends object
            ? Prisma.TypeMap['model'][T]['fields'][K] extends { type: infer R }
              ? EntityPayload<R extends Prisma.ModelName ? R : never, { include: I[K] }>
              : never
            : never;
      }
    : {}) &
  (Args extends { select: infer S }
    ? {
        [K in keyof S & keyof Prisma.TypeMap['model'][T]['fields']]: S[K] extends true
          ? Prisma.TypeMap['model'][T]['fields'][K] extends { type: infer R }
            ? R
            : Prisma.TypeMap['model'][T]['fields'][K]
          : S[K] extends object
            ? Prisma.TypeMap['model'][T]['fields'][K] extends { type: infer R }
              ? EntityPayload<R extends Prisma.ModelName ? R : never, { select: S[K] }>
              : never
            : never;
      }
    : {});

// 帶 Include 嘅 Payload
export type EntityPayloadWithInclude<
  T extends Prisma.ModelName,
  I extends Prisma.TypeMap['model'][T]['operations']['findUnique']['args']['include'] = {}, // 用 Prisma Include 類型
> = EntityPayload<T, { include: I }>;

// 帶 Select 嘅 Payload
export type EntityPayloadWithSelect<
  T extends Prisma.ModelName,
  S extends Prisma.TypeMap['model'][T]['operations']['findUnique']['args']['select'] = {}, // 用 Prisma Select 類型
> = EntityPayload<T, { select: S }>;