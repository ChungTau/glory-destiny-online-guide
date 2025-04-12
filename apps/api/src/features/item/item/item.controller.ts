// apps/api/src/features/item/item/item.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('items')
export class ItemController extends BaseController<
  EntityPayloadWithInclude<typeof Prisma.ModelName.Item, Prisma.ItemInclude>,
  typeof Prisma.ModelName.Item,
  Prisma.ItemInclude,
  Prisma.ItemSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.Item}Service`)
    protected readonly service: any // 用動態生成嘅 Service
  ) {
    super();
  }
}
