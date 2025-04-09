// apps/api/src/features/geography/nation/nation.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('nations')
export class NationController extends BaseController<
  EntityPayloadWithInclude<typeof Prisma.ModelName.Nation, Prisma.NationInclude>,
  typeof Prisma.ModelName.Nation,
  Prisma.NationInclude,
  Prisma.NationSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.Nation}Service`)
    protected readonly service: any, // 用動態生成嘅 Service
  ) {
    super();
  }
}