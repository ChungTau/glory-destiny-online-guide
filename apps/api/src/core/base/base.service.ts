// apps/api/src/core/base.service.ts
import { Prisma } from '@glory-destiny-online-guide/prisma';
import {
  Injectable,
  Logger,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import {
  QueryParams,
  PaginatedQueryParams,
} from '../../common/dto/query-params.dto';
import {
  EntityCreateInput,
  EntityUpdateInput,
  Identifiable,
} from '../../common/types/prisma.types';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

@Injectable()
export abstract class BaseService<
  T extends Identifiable,
  K extends Prisma.ModelName,
  I extends Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include'] = {}, // 用 Prisma Include 類型
  S extends Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['select'] = {}, // 用 Prisma Select 類型
> {
  protected readonly logger: Logger;
  protected readonly prisma: PrismaService;
  protected readonly redis?: RedisService;
  public abstract readonly entityName: K;

  constructor(prisma: PrismaService, redis?: RedisService) {
    this.prisma = prisma;
    this.redis = redis;
    this.logger = new Logger(this.constructor.name);
  }

  protected getCacheKey(
    id: string | number | QueryParams | PaginatedQueryParams,
    include?: I,
    select?: S,
    suffix?: string,
  ): string {
    const namespace = `${process.env.APP_NAME || 'GDO-Guide'}:${process.env.NODE_ENV || 'dev'}`;
    const idStr = typeof id === 'object' ? JSON.stringify(id) : id.toString();
    const includeStr = include ? `:include:${JSON.stringify(include)}` : '';
    const selectStr = select ? `:select:${JSON.stringify(select)}` : '';
    return suffix
      ? `${namespace}:${String(this.entityName)}:${idStr}${includeStr}${selectStr}:${suffix}`
      : `${namespace}:${String(this.entityName)}:${idStr}${includeStr}${selectStr}`;
  }

  protected async getFromCache<TData>(key: string): Promise<TData | null> {
    if (!this.redis) return null;
    try {
      const cached = await this.redis.getJson<TData>(key);
      if (cached) this.logger.debug(`快取命中，key: ${key}`);
      return cached;
    } catch (error) {
      this.logger.error(`快取讀取失敗，key: ${key}`, error instanceof Error ? error.stack : undefined);
      return null;
    }
  }

  protected async setToCache<TData>(key: string, value: TData, ttl = 3600): Promise<void> {
    if (!this.redis) return;
    try {
      await this.redis.setJson(key, value, ttl);
      this.logger.debug(`已快取 ${key}，TTL: ${ttl}秒`);
    } catch (error) {
      this.logger.error(`快取寫入失敗，key: ${key}`, error instanceof Error ? error.stack : undefined);
    }
  }

  protected async invalidateCache(
    idOrQuery: number | string | QueryParams | PaginatedQueryParams,
    wildcard = false,
  ): Promise<void> {
    if (!this.redis) return;
    try {
      if (wildcard) {
        const pattern = this.getCacheKey(idOrQuery) + '*';
        const keys = await this.redis.keys(pattern);
        if (keys.length > 0) await this.redis.del(keys);
      } else {
        const key = this.getCacheKey(idOrQuery);
        await this.redis.del(key);
      }
    } catch (error) {
      this.logger.error(`快取清除失敗`, error instanceof Error ? error.stack : undefined);
    }
  }

  async createOne(data: EntityCreateInput<K>): Promise<T> {
    try {
      const result = await this.prisma[String(this.entityName)].create({ data });
      return result as T;
    } catch (error) {
      this.handlePrismaError(error, '創建單個');
    }
  }

  async createMany(data: EntityCreateInput<K>[]): Promise<Prisma.BatchPayload> {
    try {
      return await this.prisma[String(this.entityName)].createMany({ data });
    } catch (error) {
      this.handlePrismaError(error, '批量創建');
    }
  }

  async findOne(id: number, include?: I, select?: S): Promise<T> {
    const cacheKey = this.getCacheKey(id, include, select);
    const cached = await this.getFromCache<T>(cacheKey);
    if (cached) return cached;

    try {
      const result = await this.prisma[String(this.entityName)].findUnique({
        where: { id },
        include,
        select,
      });
      if (!result) throw new NotFoundException(`${String(this.entityName)} ID ${id} 搵唔到`);
      await this.setToCache(cacheKey, result);
      return result as T;
    } catch (error) {
      this.handlePrismaError(error, '查詢單個', id);
    }
  }

  async findMany(params: QueryParams & { include?: I; select?: S } = {}): Promise<T[]> {
    const { where, sort, order, include, select } = params;
    const cacheKey = this.getCacheKey({ where, sort, order }, include, select);
    const cached = await this.getFromCache<T[]>(cacheKey);
    if (cached) return cached;

    try {
      const result = await this.prisma[String(this.entityName)].findMany({
        where,
        orderBy: sort ? { [sort]: order || 'asc' } : undefined,
        include,
        select,
      });
      await this.setToCache(cacheKey, result);
      return result as T[];
    } catch (error) {
      this.handlePrismaError(error, '查詢多個');
    }
  }

  async findManyPaginated(params: PaginatedQueryParams & { include?: I; select?: S } = {}): Promise<PaginatedResult<T>> {
    const { page = 1, limit = 10, sort, order, where, include, select } = params;
    if (page < 1 || limit < 1) throw new BadRequestException('page 同 limit 必須大於 0');
    const skip = (page - 1) * limit;
    const cacheKey = this.getCacheKey({ page, limit, sort, order, where }, include, select);
    const cached = await this.getFromCache<PaginatedResult<T>>(cacheKey);
    if (cached) return cached;

    try {
      const [data, total] = await Promise.all([
        this.prisma[String(this.entityName)].findMany({
          skip,
          take: limit,
          where,
          orderBy: sort ? { [sort]: order || 'asc' } : undefined,
          include,
          select,
        }),
        this.prisma[String(this.entityName)].count({ where }),
      ]);
      const result: PaginatedResult<T> = { data: data as T[], total };
      await this.setToCache(cacheKey, result);
      return result;
    } catch (error) {
      this.handlePrismaError(error, '分頁查詢');
    }
  }

  async updateOne(id: number, data: EntityUpdateInput<K>): Promise<T> {
    try {
      const result = await this.prisma[String(this.entityName)].update({
        where: { id },
        data,
      });
      await this.invalidateCache(id, true);
      return result as T;
    } catch (error) {
      this.handlePrismaError(error, '更新單個', id);
    }
  }

  async updateMany(where: Record<string, any>, data: EntityUpdateInput<K>): Promise<Prisma.BatchPayload> {
    try {
      const result = await this.prisma[String(this.entityName)].updateMany({
        where,
        data,
      });
      await this.invalidateCache(where);
      return result;
    } catch (error) {
      this.handlePrismaError(error, '批量更新');
    }
  }

  async bulkUpdate(updates: { id: number; data: EntityUpdateInput<K> }[]): Promise<T[]> {
    try {
      const results = await Promise.all(
        updates.map(({ id, data }) =>
          this.prisma[String(this.entityName)].update({ where: { id }, data }),
        ),
      );
      await Promise.all(updates.map(({ id }) => this.invalidateCache(id, true)));
      return results as T[];
    } catch (error) {
      this.handlePrismaError(error, '批量更新多個');
    }
  }

  async remove(id: number): Promise<T> {
    try {
      const result = await this.prisma[String(this.entityName)].delete({
        where: { id },
      });
      await this.invalidateCache(id, true);
      return result as T;
    } catch (error) {
      this.handlePrismaError(error, '刪除單個', id);
    }
  }

  async removeMany(where: Record<string, any>): Promise<Prisma.BatchPayload> {
    try {
      const result = await this.prisma[String(this.entityName)].deleteMany({ where });
      await this.invalidateCache(where);
      return result;
    } catch (error) {
      this.handlePrismaError(error, '批量刪除');
    }
  }

  async bulkRemove(ids: number[]): Promise<Prisma.BatchPayload> {
    try {
      const result = await this.prisma[String(this.entityName)].deleteMany({
        where: { id: { in: ids } },
      });
      await Promise.all(ids.map((id) => this.invalidateCache(id, true)));
      return result;
    } catch (error) {
      this.handlePrismaError(error, '批量刪除多個');
    }
  }

  private handlePrismaError(error: unknown, operation: string, id?: number): never {
    const idMsg = id ? `ID ${id}` : '';
    const errorMsg = error instanceof Error ? error.message : String(error);
    this.logger.error(
      `${operation} ${String(this.entityName)} ${idMsg} 失敗: ${errorMsg}`,
      error instanceof Error ? error.stack : undefined,
    );
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new BadRequestException(`${String(this.entityName)} 唯一字段衝突`);
        case 'P2025':
          throw new NotFoundException(`${String(this.entityName)} ${idMsg} 搵唔到`);
        case 'P2003':
          throw new BadRequestException(`${String(this.entityName)} 外鍵約束失敗`);
        default:
          throw new InternalServerErrorException(
            `${operation} ${String(this.entityName)} 失敗: ${error.message}`,
          );
      }
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      throw new BadRequestException(`無效嘅 ${String(this.entityName)} 數據: ${error.message}`);
    }
    throw new InternalServerErrorException(`${operation} ${String(this.entityName)} 失敗: ${errorMsg}`);
  }
}
