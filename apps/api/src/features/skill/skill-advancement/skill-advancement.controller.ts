// apps/api/src/features/skill/skill-advancement/skill-advancement.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('skill-advancements')
export class SkillAdvancementController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.SkillAdvancement,
    Prisma.SkillAdvancementInclude
  >,
  typeof Prisma.ModelName.SkillAdvancement,
  Prisma.SkillAdvancementInclude,
  Prisma.SkillAdvancementSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.SkillAdvancement}Service`)
    protected readonly service: any // 用動態生成嘅 Service
  ) {
    super();
  }
}
