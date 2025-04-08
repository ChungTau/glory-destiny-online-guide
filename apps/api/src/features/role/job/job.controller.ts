// apps/api/src/features/geography/job/job.controller.ts
import { Controller } from '@nestjs/common';
import { JobService } from './job.service';
import { JobCreateDto } from './dto/job-create.dto';
import { JobUpdateDto } from './dto/job-update.dto';
import { Job, JobInclude, Prisma } from '@glory-destiny-online-guide/prisma';
import { BaseController } from 'src/core/base.controller';
import { JobResponseDto } from './dto/job-response.dto';

@Controller('jobs')
export class JobController extends BaseController<
  Job,
  JobResponseDto,
  typeof Prisma.ModelName.Job,
  JobCreateDto,
  JobUpdateDto,
  JobInclude
> {
  protected readonly service: JobService; // 只聲明類型，唔賦值

  constructor(private readonly jobService: JobService) {
    super();
    this.service = this.jobService; // 喺 constructor 入面賦值
  }
}