// apps/api/src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './core/prisma/prisma.service';
import { BullModule } from '@nestjs/bull';
import { ExampleProcessor } from './example.processor';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { RedisModule } from './core/redis/redis.module';
import { redisConfig } from './core/redis/redis.config';
import { NationModule } from './features/geography/nation/nation.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    BullModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => redisConfig(configService),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: 'example-queue', // 喺 AppModule 註冊隊列
    }),
    RedisModule,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        'node_modules',
        '@bull-board',
        'ui',
        'dist',
      ),
      serveRoot: '/queues',
    } as const),
    BullBoardModule.forRoot({
      route: '/queues',
      adapter: ExpressAdapter as any,
    }),
    BullBoardModule.forFeature({
      name: 'example-queue',
      adapter: BullAdapter as any,
    }),
    NationModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, ExampleProcessor],
})
export class AppModule {}
