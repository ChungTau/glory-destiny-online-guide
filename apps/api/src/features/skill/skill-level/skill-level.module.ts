// apps/api/src/features/skill/skill/skill.module.ts
import { Module } from '@nestjs/common';
import { SkillLevelController } from './skill-level.controller';
import { CustomSkillLevelService } from './skill-level.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [SkillLevelController],
  providers: [CustomSkillLevelService, provideBaseService(Prisma.ModelName.SkillLevel)],
})
export class SkillLevelModule {}