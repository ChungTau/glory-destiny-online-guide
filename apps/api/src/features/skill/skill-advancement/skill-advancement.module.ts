// apps/api/src/features/skill/skill-advancement/skill-advancement.module.ts
import { Module } from '@nestjs/common';
import { SkillAdvancementController } from './skill-advancement.controller';
import { CustomSkillAdvancementService } from './skill-advancement.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [SkillAdvancementController],
  providers: [
    CustomSkillAdvancementService,
    provideBaseService(Prisma.ModelName.SkillAdvancement),
  ],
})
export class SkillAdvancementModule {}
