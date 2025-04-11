// apps/api/src/features/quest/quest/quest.module.ts
import { Module } from '@nestjs/common';
import { QuestController } from './quest.controller';
import { CustomQuestService } from './quest.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [QuestController],
  providers: [CustomQuestService, provideBaseService(Prisma.ModelName.Quest)],
})
export class QuestModule {}
