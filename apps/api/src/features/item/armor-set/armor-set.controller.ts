// apps/api/src/features/item/armor-set/armor-set.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('armor-sets')
export class ArmorSetController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.ArmorSet,
    Prisma.ArmorSetInclude
  >,
  typeof Prisma.ModelName.ArmorSet,
  Prisma.ArmorSetInclude,
  Prisma.ArmorSetSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.ArmorSet}Service`)
    protected readonly service: any, // 用動態生成嘅 Service
  ) {
    super();
  }
}
