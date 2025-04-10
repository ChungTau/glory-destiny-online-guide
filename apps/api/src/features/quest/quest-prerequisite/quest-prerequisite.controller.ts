// apps/api/src/features/quest/quest-prerequisite/quest-prerequisite.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';
import { JunctionService, JunctionController } from 'src/core/junction';

@Controller('quest-prerequisites')
export class QuestPrerequisiteController extends JunctionController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.QuestPrerequisite,
    Prisma.QuestPrerequisiteInclude
  >,
  typeof Prisma.ModelName.QuestPrerequisite,
  Prisma.QuestPrerequisiteInclude,
  Prisma.QuestPrerequisiteSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.QuestPrerequisite}Service`)
    protected readonly service: JunctionService<
      EntityPayloadWithInclude<
        typeof Prisma.ModelName.QuestPrerequisite,
        Prisma.QuestPrerequisiteInclude
      >,
      typeof Prisma.ModelName.QuestPrerequisite,
      Prisma.QuestPrerequisiteInclude,
      Prisma.QuestPrerequisiteSelect
    >,
  ) {
    super();
  }
}
