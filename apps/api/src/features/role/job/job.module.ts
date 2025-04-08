import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { RedisModule } from 'src/core/redis/redis.module';
import { PrismaModule } from 'src/core/prisma/prisma.module';

@Module({
  imports: [RedisModule, PrismaModule],
  providers: [JobService],
  controllers: [JobController],
})
export class JobModule {}
