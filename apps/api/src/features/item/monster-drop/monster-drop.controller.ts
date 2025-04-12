// apps/api/src/features/item/monster-drop/monster-drop.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';
import { JunctionService, JunctionController } from 'src/core/junction';

@Controller('monster-drops')
export class MonsterDropController extends JunctionController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.MonsterDrop,
    Prisma.MonsterDropInclude
  >,
  typeof Prisma.ModelName.MonsterDrop,
  Prisma.MonsterDropInclude,
  Prisma.MonsterDropSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.MonsterDrop}Service`)
    protected readonly service: JunctionService<
      EntityPayloadWithInclude<
        typeof Prisma.ModelName.MonsterDrop,
        Prisma.MonsterDropInclude
      >,
      typeof Prisma.ModelName.MonsterDrop,
      Prisma.MonsterDropInclude,
      Prisma.MonsterDropSelect
    >
  ) {
    super();
  }
}
