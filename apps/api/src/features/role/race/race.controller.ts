// apps/api/src/features/geography/race/race.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('races')
export class RaceController extends BaseController<
  EntityPayloadWithInclude<typeof Prisma.ModelName.Race, Prisma.RaceInclude>,
  typeof Prisma.ModelName.Race,
  Prisma.RaceInclude,
  Prisma.RaceSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.Race}Service`)
    protected readonly service: any, // 用動態生成嘅 Service
  ) {
    super();
  }
}