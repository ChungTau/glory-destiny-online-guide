// apps/api/src/core/junction/junction.service.ts
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
  EntityWhereInput,
} from '../../common/types/prisma.types';

export interface PaginatedResult<T> {
  data: T[];
  total: number;
}

// 移除 JunctionEntity，因為唔需要限制 T
@Injectable()
export abstract class JunctionService<
  T, // 唔再限制為 JunctionEntity
  K extends Prisma.ModelName,
  I extends
    Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include'] = {},
  S extends
    Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['select'] = {},
> {
  protected readonly logger: Logger;
  protected readonly prisma: PrismaService;
  protected readonly redis?: RedisService;
  public abstract readonly entityName: K;
  public abstract readonly entity1Key: string;
  public abstract readonly entity2Key: string;

  constructor(prisma: PrismaService, redis?: RedisService) {
    this.prisma = prisma;
    this.redis = redis;
    this.logger = new Logger(this.constructor.name);
  }

  protected getCacheKey(
    id:
      | { [key: string]: number }
      | QueryParams
      | PaginatedQueryParams
      | EntityWhereInput<K>
      | undefined,
    include?: I,
    select?: S,
    suffix?: string,
  ): string {
    const idStr = id === undefined ? '' : JSON.stringify(id); // 用 JSON.stringify 代替 toString
    const includeStr = include ? `:include:${JSON.stringify(include)}` : '';
    const selectStr = select ? `:select:${JSON.stringify(select)}` : '';
    return suffix
      ? `${String(this.entityName)}:${idStr}${includeStr}${selectStr}:${suffix}`
      : `${String(this.entityName)}:${idStr}${includeStr}${selectStr}`;
  }

  protected async getFromCache<TData>(key: string): Promise<TData | null> {
    if (!this.redis) return null;
    try {
      const cached = await this.redis.getJson<TData>(key);
      if (cached) this.logger.debug(`快取命中，key: ${key}`);
      return cached;
    } catch (error) {
      this.logger.error(
        `快取讀取失敗，key: ${key}`,
        error instanceof Error ? error.stack : undefined,
      );
      return null;
    }
  }

  protected async setToCache<TData>(
    key: string,
    value: TData,
    ttl = 3600,
  ): Promise<void> {
    if (!this.redis) return;
    try {
      await this.redis.setJson(key, value, ttl);
      this.logger.debug(`已快取 ${key}，TTL: ${ttl}秒`);
    } catch (error) {
      this.logger.error(
        `快取寫入失敗，key: ${key}`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }

  protected async invalidateCache(
    idOrQuery?:
      | { [key: string]: number }
      | QueryParams
      | PaginatedQueryParams
      | EntityWhereInput<K>,
    wildcard = false,
  ): Promise<void> {
    if (!this.redis) return;
    try {
      if (wildcard) {
        const pattern = `${String(this.entityName)}:*`;
        const keys = await this.redis.keys(pattern);
        if (keys.length > 0) await this.redis.del(keys);
      } else if (idOrQuery) {
        const key = this.getCacheKey(idOrQuery);
        await this.redis.del(key);
      }
    } catch (error) {
      this.logger.error(
        `快取清除失敗`,
        error instanceof Error ? error.stack : undefined,
      );
    }
  }

  async createOne(data: EntityCreateInput<K>): Promise<T> {
    try {
      const result = await this.prisma[String(this.entityName)].create({
        data,
      });
      await this.invalidateCache(undefined, true); // 用 undefined 代替 ''
      return result as T;
    } catch (error) {
      this.handlePrismaError(error, '創建單個');
    }
  }

  async findOne(
    ids: { [key: string]: number },
    include?: I,
    select?: S,
  ): Promise<T> {
    const cacheKey = this.getCacheKey(ids, include, select);
    const cached = await this.getFromCache<T>(cacheKey);
    if (cached) return cached;

    try {
      const result = await this.prisma[String(this.entityName)].findUnique({
        where: ids,
        include,
        select,
      });
      if (!result)
        throw new NotFoundException(
          `${String(this.entityName)} ${JSON.stringify(ids)} 搵唔到`,
        );
      await this.setToCache(cacheKey, result);
      return result as T;
    } catch (error) {
      this.handlePrismaError(error, '查詢單個', ids);
    }
  }

  async findMany(
    params: QueryParams & { include?: I; select?: S } = {},
  ): Promise<T[]> {
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

  async findManyPaginated(
    params: PaginatedQueryParams & { include?: I; select?: S } = {},
  ): Promise<PaginatedResult<T>> {
    const {
      page = 1,
      limit = 10,
      sort,
      order,
      where,
      include,
      select,
    } = params;
    if (page < 1 || limit < 1)
      throw new BadRequestException('page 同 limit 必須大於 0');
    const skip = (page - 1) * limit;
    const cacheKey = this.getCacheKey(
      { page, limit, sort, order, where },
      include,
      select,
    );
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

  async updateOne(
    ids: { [key: string]: number },
    data: EntityUpdateInput<K>,
  ): Promise<T> {
    try {
      const result = await this.prisma[String(this.entityName)].update({
        where: ids,
        data,
      });
      await this.invalidateCache(ids, true);
      return result as T;
    } catch (error) {
      this.handlePrismaError(error, '更新單個', ids);
    }
  }

  async deleteOne(ids: { [key: string]: number }): Promise<T> {
    try {
      const result = await this.prisma[String(this.entityName)].delete({
        where: ids,
      });
      await this.invalidateCache(ids, true);
      return result as T;
    } catch (error) {
      this.handlePrismaError(error, '刪除單個', ids);
    }
  }

  private handlePrismaError(
    error: unknown,
    operation: string,
    ids?: { [key: string]: number },
  ): never {
    const idMsg = ids ? `IDs ${JSON.stringify(ids)}` : '';
    const errorMsg = error instanceof Error ? error.message : String(error);
    this.logger.error(
      `${operation} ${String(this.entityName)} ${idMsg} 失敗: ${errorMsg}`,
      error instanceof Error ? error.stack : undefined,
    );
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          throw new BadRequestException(
            `${String(this.entityName)} 唯一字段衝突`,
          );
        case 'P2025':
          throw new NotFoundException(
            `${String(this.entityName)} ${idMsg} 搵唔到`,
          );
        case 'P2003':
          throw new BadRequestException(
            `${String(this.entityName)} 外鍵約束失敗`,
          );
        default:
          throw new InternalServerErrorException(
            `${operation} ${String(this.entityName)} 失敗: ${error.message}`,
          );
      }
    }
    throw new InternalServerErrorException(
      `${operation} ${String(this.entityName)} 失敗: ${errorMsg}`,
    );
  }
}
