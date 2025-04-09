// apps/api/src/features/geography/job/job.module.ts
import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { CustomJobService } from './job.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [JobController],
  providers: [
    CustomJobService,
    provideBaseService(Prisma.ModelName.Job)
  ],
})
export class JobModule {}