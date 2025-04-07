// apps/api/src/core/redis/redis.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { RedisService } from './redis.service';

@Module({
  imports: [
    ConfigModule,
    BullModule.registerQueue({
      name: 'example-queue', // 喺 RedisModule 註冊隊列
    }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
