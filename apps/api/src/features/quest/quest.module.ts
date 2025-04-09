// apps/api/src/features/quest/quest.module.ts
import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  exports: [],
})
export class QuestModule {}