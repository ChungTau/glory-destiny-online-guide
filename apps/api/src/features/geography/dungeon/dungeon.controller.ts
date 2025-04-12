// apps/api/src/features/geography/dungeon/dungeon.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('dungeons')
export class DungeonController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.Dungeon,
    Prisma.DungeonInclude
  >,
  typeof Prisma.ModelName.Dungeon,
  Prisma.DungeonInclude,
  Prisma.DungeonSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.Dungeon}Service`)
    protected readonly service: any // 用動態生成嘅 Service
  ) {
    super();
  }
}
