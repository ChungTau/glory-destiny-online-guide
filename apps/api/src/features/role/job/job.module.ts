// apps/api/src/features/geography/job/job.module.ts
import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from './job.service';
import { BaseModule } from 'src/core/base.module';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule.forEntity(Prisma.ModelName.Job, [JobService])],
  controllers: [JobController],
  providers: [JobService],
})
export class JobModule {}