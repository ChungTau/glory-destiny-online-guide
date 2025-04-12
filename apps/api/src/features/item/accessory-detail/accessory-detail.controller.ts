// apps/api/src/features/item/accessory-detail/accessory-detail.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('accessory-details')
export class AccessoryDetailController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.AccessoryDetail,
    Prisma.AccessoryDetailInclude
  >,
  typeof Prisma.ModelName.AccessoryDetail,
  Prisma.AccessoryDetailInclude,
  Prisma.AccessoryDetailSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.AccessoryDetail}Service`)
    protected readonly service: any // 用動態生成嘅 Service
  ) {
    super();
  }
}
