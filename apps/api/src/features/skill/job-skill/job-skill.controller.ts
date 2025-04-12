// apps/api/src/job-skill/job-skill.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';
import { JunctionService, JunctionController } from 'src/core/junction';

@Controller('job-skills')
export class JobSkillController extends JunctionController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.JobSkill,
    Prisma.JobSkillInclude
  >,
  typeof Prisma.ModelName.JobSkill,
  Prisma.JobSkillInclude,
  Prisma.JobSkillSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.JobSkill}Service`)
    protected readonly service: JunctionService<
      EntityPayloadWithInclude<
        typeof Prisma.ModelName.JobSkill,
        Prisma.JobSkillInclude
      >,
      typeof Prisma.ModelName.JobSkill,
      Prisma.JobSkillInclude,
      Prisma.JobSkillSelect
    >
  ) {
    super();
  }
}
