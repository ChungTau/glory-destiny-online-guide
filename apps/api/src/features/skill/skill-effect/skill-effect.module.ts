// apps/api/src/features/skill/skill-effect/skill-effect.module.ts
import { Module } from '@nestjs/common';
import { SkillEffectController } from './skill-effect.controller';
import { CustomSkillEffectService } from './skill-effect.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [SkillEffectController],
  providers: [
    CustomSkillEffectService,
    provideBaseService(Prisma.ModelName.SkillEffect),
  ],
})
export class SkillEffectModule {}
