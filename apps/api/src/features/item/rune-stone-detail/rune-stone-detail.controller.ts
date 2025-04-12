// apps/api/src/features/item/rune-stone-detail/rune-stone-detail.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('rune-stone-details')
export class RuneStoneDetailController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.RuneStoneDetail,
    Prisma.RuneStoneDetailInclude
  >,
  typeof Prisma.ModelName.RuneStoneDetail,
  Prisma.RuneStoneDetailInclude,
  Prisma.RuneStoneDetailSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.RuneStoneDetail}Service`)
    protected readonly service: any // 用動態生成嘅 Service
  ) {
    super();
  }
}
