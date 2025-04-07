// apps/api/src/core/redis/redis.service.ts
import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { redisConfig } from './redis.config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly redis: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor(
    private configService: ConfigService,
    @InjectQueue('example-queue') private exampleQueue: Queue,
  ) {
    this.redis =
      this.exampleQueue.client.redis || new Redis(redisConfig(configService));
  }

  async onModuleInit() {
    try {
      const pong = await this.redis.ping();
      this.logger.log('Redis 連線成功: ' + pong);
    } catch (error: unknown) {
      // 用 unknown
      if (error instanceof Error) {
        this.logger.error('Redis 連線失敗', error.stack);
        throw new Error('Redis 連線失敗');
      } else {
        this.logger.error('Redis 連線失敗', '未知錯誤');
        throw new Error('Redis 連線失敗');
      }
    }
  }

  async onModuleDestroy() {
    await this.redis.quit();
    this.logger.log('Redis 已斷開連線');
  }

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
