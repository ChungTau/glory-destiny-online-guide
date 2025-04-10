// apps/api/src/features/skill/pet-skill-link/pet-skill-link.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';
import { JunctionService, JunctionController } from 'src/core/junction';

@Controller('pet-skill-links')
export class PetSkillLinkController extends JunctionController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.PetSkillLink,
    Prisma.PetSkillLinkInclude
  >,
  typeof Prisma.ModelName.PetSkillLink,
  Prisma.PetSkillLinkInclude,
  Prisma.PetSkillLinkSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.PetSkillLink}Service`)
    protected readonly service: JunctionService<
      EntityPayloadWithInclude<
        typeof Prisma.ModelName.PetSkillLink,
        Prisma.PetSkillLinkInclude
      >,
      typeof Prisma.ModelName.PetSkillLink,
      Prisma.PetSkillLinkInclude,
      Prisma.PetSkillLinkSelect
    >,
  ) {
    super();
  }
}
