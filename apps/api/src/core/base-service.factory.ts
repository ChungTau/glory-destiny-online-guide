// apps/api/src/core/base-service.factory.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RedisService } from './redis/redis.service';
import { BaseService } from './base.service';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from '../common/types/prisma.types';

@Injectable()
export class BaseServiceFactory {
  private services: Map<string, BaseService<any, any, any, any>> = new Map();

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  getService<K extends Prisma.ModelName>(
    entityName: K,
  ): BaseService<
    EntityPayloadWithInclude<K, Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include']>,
    K,
    Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include'],
    Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['select']
  > {
    const serviceName = `${entityName}Service`;
    if (!this.services.has(serviceName)) {
      class DynamicService extends BaseService<
        EntityPayloadWithInclude<K, Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include']>,
        K,
        Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include'],
        Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['select']
      > {
        public readonly entityName: K;

        constructor(prisma: PrismaService, redis: RedisService) {
          super(prisma, redis);
          this.entityName = entityName;
        }
      }
      const service = new DynamicService(this.prisma, this.redis);
      this.services.set(serviceName, service);
    }
    return this.services.get(serviceName) as BaseService<
      EntityPayloadWithInclude<K, Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include']>,
      K,
      Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include'],
      Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['select']
    >;
  }
}