import { Module } from '@nestjs/common';
import { AreaService } from './area.service';
import { AreaController } from './area.controller';
import { RedisModule } from 'src/core/redis/redis.module';
import { PrismaModule } from 'src/core/prisma/prisma.module';

@Module({
  imports: [RedisModule, PrismaModule],
  providers: [AreaService],
  controllers: [AreaController]
})
export class AreaModule {}
