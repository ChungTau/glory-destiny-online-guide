// apps/api/src/race/dto/race-response.dto.ts
import { Race, Job } from '@glory-destiny-online-guide/prisma';

export type RaceResponseDto = Race & {
  jobs: Job[]
}