// apps/api/src/features/geography/weapon-detail/weapon-detail.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('weapon-details')
export class WeaponDetailController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.WeaponDetail,
    Prisma.WeaponDetailInclude
  >,
  typeof Prisma.ModelName.WeaponDetail,
  Prisma.WeaponDetailInclude,
  Prisma.WeaponDetailSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.WeaponDetail}Service`)
    protected readonly service: any // 用動態生成嘅 Service
  ) {
    super();
  }
}
