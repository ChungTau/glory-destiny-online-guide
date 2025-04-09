// apps/api/src/features/skill/skill.module.ts
import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';
import { SkillModule as SModule } from './skill/skill.module';
import { SkillLevelModule } from './skill-level/skill-level.module';
import { SkillEffectModule } from './skill-effect/skill-effect.module';
import { SkillAdvancementModule } from './skill-advancement/skill-advancement.module';
import { PetSkillModule } from './pet-skill/pet-skill.module';
import { PetSkillLinkModule } from './pet-skill-link/pet-skill-link.module';
import { JobSkillModule } from './job-skill/job-skill.module';
@Module({
  imports: [
    CoreModule,
    SModule,
    SkillLevelModule,
    SkillEffectModule,
    SkillAdvancementModule,
    PetSkillModule,
    PetSkillLinkModule,
    JobSkillModule,
  ],
  exports: [
    SModule,
    SkillLevelModule,
    SkillEffectModule,
    SkillAdvancementModule,
    PetSkillModule,
    PetSkillLinkModule,
    JobSkillModule,
  ],
})
export class SkillModule {}
