// apps/api/src/features/skill/pet-skill-link/pet-skill-link.module.ts
import { Module } from '@nestjs/common';
import { provideJunctionService } from '../../../core/junction/junction.utils';
import { PetSkillLinkController } from './pet-skill-link.controller';
import { JunctionModule } from 'src/core/junction/junction.module';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [JunctionModule],
  controllers: [PetSkillLinkController],
  providers: [
    provideJunctionService(
      Prisma.ModelName.PetSkillLink,
      'petId',
      'petSkillId'
    ),
  ],
})
export class PetSkillLinkModule {}
