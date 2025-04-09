// apps/api/src/features/geography/quest-reward-item/quest-reward-item.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('quest-reward-items')
export class QuestRewardItemController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.QuestRewardItem,
    Prisma.QuestRewardItemInclude
  >,
  typeof Prisma.ModelName.QuestRewardItem,
  Prisma.QuestRewardItemInclude,
  Prisma.QuestRewardItemSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.QuestRewardItem}Service`)
    protected readonly service: any, // 用動態生成嘅 Service
  ) {
    super();
  }
}