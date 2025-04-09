// apps/api/src/features/quest/quest.module.ts
import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { QuestRewardItemModule } from './quest-reward-item/quest-reward-item.module';
import { QuestPrerequisiteModule } from './quest-prerequisite/quest-prerequisite.module';
import { QuestModule as QModule } from './quest/quest.module';
@Module({
  imports: [
    CoreModule,
    QModule,
    QuestRewardItemModule,
    QuestPrerequisiteModule,
  ],
  exports: [QModule, QuestRewardItemModule, QuestPrerequisiteModule],
})
export class QuestModule {}
