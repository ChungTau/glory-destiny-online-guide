// apps/api/src/features/item/quest-reward-item/quest-reward-item.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';
import { JunctionService, JunctionController } from 'src/core/junction';

@Controller('quest-reward-items')
export class QuestRewardItemController extends JunctionController<
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
    protected readonly service: JunctionService<
      EntityPayloadWithInclude<
        typeof Prisma.ModelName.QuestRewardItem,
        Prisma.QuestRewardItemInclude
      >,
      typeof Prisma.ModelName.QuestRewardItem,
      Prisma.QuestRewardItemInclude,
      Prisma.QuestRewardItemSelect
    >,
  ) {
    super();
  }
}
