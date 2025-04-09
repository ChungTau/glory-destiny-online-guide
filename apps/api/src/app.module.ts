import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { BullBoardModule } from '@bull-board/nestjs';
import { ExpressAdapter } from '@bull-board/express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { redisConfig } from './core/redis/redis.config';
import { FeatureModule } from './features/feature.module';
import { CoreModule } from './core/core.module';

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
    CoreModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'node_modules', '@bull-board', 'ui', 'dist'),
      serveRoot: '/queues',
    } as const),
    BullBoardModule.forRoot({ route: '/queues', adapter: ExpressAdapter as any }),
    FeatureModule
  ],
  controllers: [],
})
export class AppModule {}
