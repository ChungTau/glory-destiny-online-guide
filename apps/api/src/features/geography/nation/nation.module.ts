import { Module } from '@nestjs/common';
import { NationService } from './nation.service';
import { NationController } from './nation.controller';
import { RedisModule } from 'src/core/redis/redis.module';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  imports: [RedisModule],
  providers: [NationService, PrismaService],
  controllers: [NationController],
  exports: [NationService],
})
export class NationModule {}
