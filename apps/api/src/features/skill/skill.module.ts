// apps/api/src/features/skill/skill.module.ts
import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  exports: [],
})
export class SkillModule {}