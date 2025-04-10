// apps/api/src/features/item/costume-detail/costume-detail.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('costume-details')
export class CostumeDetailController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.CostumeDetail,
    Prisma.CostumeDetailInclude
  >,
  typeof Prisma.ModelName.CostumeDetail,
  Prisma.CostumeDetailInclude,
  Prisma.CostumeDetailSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.CostumeDetail}Service`)
    protected readonly service: any, // 用動態生成嘅 Service
  ) {
    super();
  }
}
