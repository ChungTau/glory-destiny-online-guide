// apps/api/src/features/item/quest-item-detail/quest-item-detail.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('quest-item-details')
export class QuestItemDetailController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.QuestItemDetail,
    Prisma.QuestItemDetailInclude
  >,
  typeof Prisma.ModelName.QuestItemDetail,
  Prisma.QuestItemDetailInclude,
  Prisma.QuestItemDetailSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.QuestItemDetail}Service`)
    protected readonly service: any // 用動態生成嘅 Service
  ) {
    super();
  }
}
