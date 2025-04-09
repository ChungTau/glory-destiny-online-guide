// apps/api/src/features/item/quest-item-detail/quest-item-detail.module.ts
import { Module } from '@nestjs/common';
import { QuestItemDetailController } from './quest-item-detail.controller';
import { CustomQuestItemDetailService } from './quest-item-detail.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [QuestItemDetailController],
  providers: [
    CustomQuestItemDetailService,
    provideBaseService(Prisma.ModelName.QuestItemDetail),
  ],
})
export class QuestItemDetailModule {}
