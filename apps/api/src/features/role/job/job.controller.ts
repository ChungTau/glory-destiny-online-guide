// apps/api/src/features/geography/job/job.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('jobs')
export class JobController extends BaseController<
  EntityPayloadWithInclude<typeof Prisma.ModelName.Job, Prisma.JobInclude>,
  typeof Prisma.ModelName.Job,
  Prisma.JobInclude,
  Prisma.JobSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.Job}Service`)
    protected readonly service: any, // 用動態生成嘅 Service
  ) {
    super();
  }
}