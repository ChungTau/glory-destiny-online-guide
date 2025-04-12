// apps/api/src/features/quest/quest-prerequisite/quest-prerequisite.module.ts
import { Module } from '@nestjs/common';
import { provideJunctionService } from '../../../core/junction/junction.utils';
import { QuestPrerequisiteController } from './quest-prerequisite.controller';
import { JunctionModule } from 'src/core/junction/junction.module';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [JunctionModule],
  controllers: [QuestPrerequisiteController],
  providers: [
    provideJunctionService(
      Prisma.ModelName.QuestPrerequisite,
      'questId',
      'prerequisiteId'
    ),
  ],
})
export class QuestPrerequisiteModule {}
