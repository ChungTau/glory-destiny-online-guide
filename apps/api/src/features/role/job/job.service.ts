// apps/api/src/features/geography/job/job.service.ts
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';
import { JobCreateDto } from './dto/job-create.dto';
import { JobUpdateDto } from './dto/job-update.dto';
import { Job, JobInclude, Prisma } from '@glory-destiny-online-guide/prisma';
import { PaginatedResult } from 'src/core/base.service';
import { JobResponseDto } from './dto/job-response.dto';

@Injectable()
export class JobService extends BaseService<
  Job,
  JobResponseDto,
  typeof Prisma.ModelName.Job,
  JobCreateDto,
  JobUpdateDto,
  JobInclude
> {
  protected readonly entityName = Prisma.ModelName
    .Job as typeof Prisma.ModelName.Job;

  constructor(prisma: PrismaService, redis: RedisService) {
    super(prisma, redis);
  }

  // 簡單查詢（無關聯）
  async findOneSimple(id: number): Promise<Job> {
    return this.findOne(id); // 用 BaseService 嘅 findOne，無 include
  }

  // 動態查詢（帶可選關聯）
  async findOneWithInclude(
    id: number,
    include?: JobInclude,
  ): Promise<Job> {
    return this.findOne(id, include);
  }

  // 分頁查詢（帶可選關聯）
  async findManyPaginatedWithInclude(
    params = {},
    include?: JobInclude,
  ): Promise<PaginatedResult<Job>> {
    return this.findManyPaginated({ ...params, include });
  }
}
