// apps/api/src/job/dto/update-job.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { JobCreateDto } from './job-create.dto';
import { Faction, JobStage } from '@glory-destiny-online-guide/prisma';

export class JobUpdateDto extends PartialType(JobCreateDto) {
  name?: string;
  raceId?: number;
  faction?: Faction;
  stage?: JobStage;
  minPromotionLevel?: number | null; // 改為 number | null
  iconUrl?: string | null; // 改為 string | null
  parentJobId?: number | null; // 改為 number | null
}