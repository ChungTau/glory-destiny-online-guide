// apps/api/src/features/quest/quest-reward-item/quest-reward-item.module.ts
import { Module } from '@nestjs/common';
import { QuestRewardItemController } from './quest-reward-item.controller';
import { CustomQuestRewardItemService } from './quest-reward-item.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [QuestRewardItemController],
  providers: [
    CustomQuestRewardItemService,
    provideBaseService(Prisma.ModelName.QuestRewardItem),
  ],
})
export class QuestRewardItemModule {}
