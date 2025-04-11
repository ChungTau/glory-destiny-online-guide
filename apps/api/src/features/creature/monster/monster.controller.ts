// apps/api/src/features/geography/dungeonMonster/dungeonMonster.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('monsters')
export class MonsterController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.Monster,
    Prisma.MonsterInclude
  >,
  typeof Prisma.ModelName.Monster,
  Prisma.MonsterInclude,
  Prisma.MonsterSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.Monster}Service`)
    protected readonly service: any, // 用動態生成嘅 Service
  ) {
    super();
  }
}
