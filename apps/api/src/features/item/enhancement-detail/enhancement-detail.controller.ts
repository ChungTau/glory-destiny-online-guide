// apps/api/src/features/item/enhancement-detail/enhancement-detail.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('enhancement-details')
export class EnhancementDetailController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.EnhancementDetail,
    Prisma.EnhancementDetailInclude
  >,
  typeof Prisma.ModelName.EnhancementDetail,
  Prisma.EnhancementDetailInclude,
  Prisma.EnhancementDetailSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.EnhancementDetail}Service`)
    protected readonly service: any, // 用動態生成嘅 Service
  ) {
    super();
  }
}
