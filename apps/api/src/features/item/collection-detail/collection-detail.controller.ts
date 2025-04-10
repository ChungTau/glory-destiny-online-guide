// apps/api/src/features/item/collection-detail/collection-detail.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('collection-details')
export class CollectionDetailController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.CollectionDetail,
    Prisma.CollectionDetailInclude
  >,
  typeof Prisma.ModelName.CollectionDetail,
  Prisma.CollectionDetailInclude,
  Prisma.CollectionDetailSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.CollectionDetail}Service`)
    protected readonly service: any, // 用動態生成嘅 Service
  ) {
    super();
  }
}
