// apps/api/src/core/redis/redis.config.ts
import { ConfigService } from '@nestjs/config';
import { BullRootModuleOptions } from '@nestjs/bull';
import { RedisOptions } from 'ioredis';

export const redisConfig = (
  configService: ConfigService,
): BullRootModuleOptions & RedisOptions => ({
  host: configService.get<string>('REDIS_HOST', 'localhost'),
  port: configService.get<number>('REDIS_PORT', 6379),
  password: configService.get<string>('REDIS_PASSWORD', 'mysecretpassword'),
  db: configService.get<number>('REDIS_DB', 0),
});
