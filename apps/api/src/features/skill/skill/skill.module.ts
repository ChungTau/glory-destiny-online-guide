// apps/api/src/features/skill/skill/skill.module.ts
import { Module } from '@nestjs/common';
import { SkillController } from './skill.controller';
import { CustomSkillService } from './skill.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [SkillController],
  providers: [CustomSkillService, provideBaseService(Prisma.ModelName.Skill)],
})
export class SkillModule {}