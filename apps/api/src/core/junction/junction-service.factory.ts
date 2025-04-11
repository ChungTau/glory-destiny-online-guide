// apps/api/src/core/junction/junction-service.factory.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RedisService } from '../redis/redis.service';
import { JunctionService } from './junction.service';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Injectable()
export class JunctionServiceFactory {
  private services: Map<string, JunctionService<any, any, any, any>> =
    new Map();

  constructor(
    private readonly prisma: PrismaService,
    private readonly redis: RedisService,
  ) {}

  getService<K extends Prisma.ModelName>(
    entityName: K,
    entity1Key: string,
    entity2Key: string,
  ): JunctionService<
    Prisma.TypeMap['model'][K]['operations']['findUnique']['result'] | null, // 直接用 Prisma 類型
    K,
    Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include'],
    Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['select']
  > {
    const serviceName = `${entityName}Service`;
    if (!this.services.has(serviceName)) {
      class DynamicJunctionService extends JunctionService<
        Prisma.TypeMap['model'][K]['operations']['findUnique']['result'] | null,
        K,
        Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include'],
        Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['select']
      > {
        public readonly entityName: K = entityName;
        public readonly entity1Key: string = entity1Key;
        public readonly entity2Key: string = entity2Key;

        constructor(prisma: PrismaService, redis: RedisService) {
          super(prisma, redis);
        }
      }
      const service = new DynamicJunctionService(this.prisma, this.redis);
      this.services.set(serviceName, service);
    }
    return this.services.get(serviceName) as any;
  }
}
