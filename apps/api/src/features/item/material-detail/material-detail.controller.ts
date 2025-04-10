// apps/api/src/features/item/material-detail/material-detail.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('material-details')
export class MaterialDetailController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.MaterialDetail,
    Prisma.MaterialDetailInclude
  >,
  typeof Prisma.ModelName.MaterialDetail,
  Prisma.MaterialDetailInclude,
  Prisma.MaterialDetailSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.MaterialDetail}Service`)
    protected readonly service: any, // 用動態生成嘅 Service
  ) {
    super();
  }
}
