// apps/api/src/features/quest/quest-prerequisite/quest-prerequisite.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('quest-prerequisites')
export class QuestPrerequisiteController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.QuestPrerequisite,
    Prisma.QuestPrerequisiteInclude
  >,
  typeof Prisma.ModelName.QuestPrerequisite,
  Prisma.QuestPrerequisiteInclude,
  Prisma.QuestPrerequisiteSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.QuestPrerequisite}Service`)
    protected readonly service: any, // 用動態生成嘅 Service
  ) {
    super();
  }
}