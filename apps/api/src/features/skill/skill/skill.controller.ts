// apps/api/src/features/geography/skill/skill.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('skills')
export class SkillController extends BaseController<
  EntityPayloadWithInclude<typeof Prisma.ModelName.Skill, Prisma.SkillInclude>,
  typeof Prisma.ModelName.Skill,
  Prisma.SkillInclude,
  Prisma.SkillSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.Skill}Service`)
    protected readonly service: any // 用動態生成嘅 Service
  ) {
    super();
  }
}
