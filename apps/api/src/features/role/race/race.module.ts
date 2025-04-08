import { Module } from '@nestjs/common';
import { RaceService } from './race.service';
import { RaceController } from './race.controller';
import { RedisModule } from 'src/core/redis/redis.module';
import { PrismaModule } from 'src/core/prisma/prisma.module';

@Module({
  imports: [RedisModule, PrismaModule],
  providers: [RaceService],
  controllers: [RaceController],
})
export class RaceModule {}
