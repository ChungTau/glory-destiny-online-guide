// apps/api/src/features/quest/quest.module.ts
import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { QuestPrerequisiteModule } from './quest-prerequisite/quest-prerequisite.module';
import { QuestModule as QModule } from './quest/quest.module';
@Module({
  imports: [CoreModule, QModule, QuestPrerequisiteModule],
  exports: [QModule, QuestPrerequisiteModule],
})
export class QuestModule {}
