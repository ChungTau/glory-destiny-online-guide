// apps/api/src/core/redis/redis.service.ts
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly redis: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor(private configService: ConfigService) {
    this.redis = new Redis({
      host: this.configService.get<string>('REDIS_HOST', 'redis'),
      port: this.configService.get<number>('REDIS_PORT', 6379),
      password: this.configService.get<string>('REDIS_PASSWORD'),
      db: this.configService.get<number>('REDIS_DB', 0),
    });
  }

  async onModuleInit() {
    try {
      const pong = await this.redis.ping();
      this.logger.log('Redis 連線成功: ' + pong);
    } catch (error) {
      this.logger.error(
        'Redis 連線失敗',
        error instanceof Error ? error.stack : undefined,
      );
      throw new Error('Redis 連線失敗');
    }
  }

  async onModuleDestroy() {
    await this.redis.quit();
    this.logger.log('Redis 已斷開連線');
  }

  // 其他方法保持不變
  async ping(): Promise<string> {
    return this.redis.ping();
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.redis.set(key, value, 'EX', ttl);
    } else {
      await this.redis.set(key, value);
    }
  }

  async del(key: string | string[]): Promise<void> {
    if (Array.isArray(key) && key.length > 0) {
      await this.redis.del(...key);
    } else if (!Array.isArray(key)) {
      await this.redis.del(key);
    }
  }

  async exists(key: string): Promise<boolean> {
    return (await this.redis.exists(key)) === 1;
  }

  async keys(pattern: string): Promise<string[]> {
    return this.redis.keys(pattern);
  }

  async getJson<T>(key: string): Promise<T | null> {
    const data = await this.redis.get(key);
    return data ? (JSON.parse(data) as T) : null; // 加類型斷言
  }

  async setJson(key: string, value: any, ttl?: number): Promise<void> {
    const jsonValue = JSON.stringify(value);
    await this.set(key, jsonValue, ttl);
  }
}
