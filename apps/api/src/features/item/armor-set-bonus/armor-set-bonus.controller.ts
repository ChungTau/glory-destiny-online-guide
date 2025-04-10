// apps/api/src/features/item/armor-set-bonus/armor-set-bonus.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('armor-set-bonuss')
export class ArmorSetBonusController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.ArmorSetBonus,
    Prisma.ArmorSetBonusInclude
  >,
  typeof Prisma.ModelName.ArmorSetBonus,
  Prisma.ArmorSetBonusInclude,
  Prisma.ArmorSetBonusSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.ArmorSetBonus}Service`)
    protected readonly service: any, // 用動態生成嘅 Service
  ) {
    super();
  }
}
