// apps/api/src/core/base.module.ts
import { DynamicModule, Module, Provider } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RedisService } from './redis/redis.service';
import { BaseService } from './base.service';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from '../common/types/prisma.types';
import { CoreModule } from './core.module';

@Module({})
export class BaseModule {
  static forEntity<K extends Prisma.ModelName>(
    entityName: K,
    providers: Provider[] = [],
  ): DynamicModule {
    const serviceProvider = {
      provide: `${entityName}Service`,
      useClass: class extends BaseService<
        EntityPayloadWithInclude<K, Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include']>,
        K,
        Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['include'],
        Prisma.TypeMap['model'][K]['operations']['findUnique']['args']['select']
      > {
        protected readonly entityName = entityName;
        constructor(prisma: PrismaService, redis: RedisService) {
          super(prisma, redis);
        }
      },
    };

    return {
      module: BaseModule,
      imports: [CoreModule],
      providers: [serviceProvider, ...providers],
      exports: [serviceProvider],
    };
  }
}