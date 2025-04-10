// apps/api/src/features/item/quest-reward-item/quest-reward-item.module.ts
import { Module } from '@nestjs/common';
import { provideJunctionService } from '../../../core/junction/junction.utils';
import { QuestRewardItemController } from './quest-reward-item.controller';
import { JunctionModule } from 'src/core/junction/junction.module';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [JunctionModule],
  controllers: [QuestRewardItemController],
  providers: [
    provideJunctionService(
      Prisma.ModelName.QuestRewardItem,
      'questId',
      'itemId',
    ),
  ],
})
export class QuestRewardItemModule {}
