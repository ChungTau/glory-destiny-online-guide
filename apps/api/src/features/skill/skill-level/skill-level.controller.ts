// apps/api/src/features/geography/skill/skill.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('skill-levels')
export class SkillLevelController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.SkillLevel,
    Prisma.SkillLevelInclude
  >,
  typeof Prisma.ModelName.SkillLevel,
  Prisma.SkillLevelInclude,
  Prisma.SkillLevelSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.SkillLevel}Service`)
    protected readonly service: any // 用動態生成嘅 Service
  ) {
    super();
  }
}
