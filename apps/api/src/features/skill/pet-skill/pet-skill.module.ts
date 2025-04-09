// apps/api/src/features/skill/pet-skill/pet-skill.module.ts
import { Module } from '@nestjs/common';
import { PetSkillController } from './pet-skill.controller';
import { CustomPetSkillService } from './pet-skill.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [PetSkillController],
  providers: [
    CustomPetSkillService,
    provideBaseService(Prisma.ModelName.PetSkill),
  ],
})
export class PetSkillModule {}
