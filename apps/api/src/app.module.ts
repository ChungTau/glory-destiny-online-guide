import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PrismaModule } from './core/prisma/prisma.module';
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RedisModule } from './core/redis/redis.module';
import { redisConfig } from './core/redis/redis.config';
import { FeatureModule } from './features/feature.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true, // 加呢行，設為全局
    }),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => redisConfig(configService),
      inject: [ConfigService],
    }),
    RedisModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'node_modules', '@bull-board', 'ui', 'dist'),
      serveRoot: '/queues',
    } as const),
    BullBoardModule.forRoot({ route: '/queues', adapter: ExpressAdapter as any }),
    PrismaModule,
    FeatureModule
  ],
  controllers: [],
})
export class AppModule {}