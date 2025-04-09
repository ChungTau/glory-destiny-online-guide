// apps/api/src/job-skill/job-skill.module.ts
import { Module } from '@nestjs/common';
import { provideJunctionService } from '../../../core/junction/junction.utils';
import { JobSkillController } from './job-skill.controller';
import { JunctionModule } from 'src/core/junction/junction.module';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [JunctionModule],
  controllers: [JobSkillController],
  providers: [
    provideJunctionService(Prisma.ModelName.JobSkill, 'jobId', 'skillId'),
  ],
})
export class JobSkillModule {}
