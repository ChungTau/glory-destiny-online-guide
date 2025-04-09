// apps/api/src/features/skill/pet-skill/pet-skill.module.ts
import { Module } from '@nestjs/common';
import { PetSkillLinkController } from './pet-skill-link.controller';
import { CustomPetSkillLinkService } from './pet-skill-link.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [PetSkillLinkController],
  providers: [CustomPetSkillLinkService, provideBaseService(Prisma.ModelName.PetSkillLink)],
})
export class PetSkillLinkModule {}