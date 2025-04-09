// apps/api/src/features/quest/quest-prerequisite/quest-prerequisite.module.ts
import { Module } from '@nestjs/common';
import { QuestPrerequisiteController } from './quest-prerequisite.controller';
import { CustomQuestPrerequisiteService } from './quest-prerequisite.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [QuestPrerequisiteController],
  providers: [
    CustomQuestPrerequisiteService,
    provideBaseService(Prisma.ModelName.QuestPrerequisite),
  ],
})
export class QuestPrerequisiteModule {}
