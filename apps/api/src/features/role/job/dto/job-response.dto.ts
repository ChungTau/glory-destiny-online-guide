// apps/api/src/job/dto/job-response.dto.ts
import { Job, Race } from '@glory-destiny-online-guide/prisma';

export type JobResponseDto = Job & {
    race: Race
}