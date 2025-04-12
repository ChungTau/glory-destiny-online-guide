// apps/api/src/features/quest/quest/quest.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('quests')
export class QuestController extends BaseController<
  EntityPayloadWithInclude<typeof Prisma.ModelName.Quest, Prisma.QuestInclude>,
  typeof Prisma.ModelName.Quest,
  Prisma.QuestInclude,
  Prisma.QuestSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.Quest}Service`)
    protected readonly service: any // 用動態生成嘅 Service
  ) {
    super();
  }
}
