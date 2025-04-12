// apps/api/src/features/item/item-attribute/item-attribute.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { BaseController } from 'src/core/base/base.controller';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';

@Controller('item-attributes')
export class ItemAttributeController extends BaseController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.ItemAttribute,
    Prisma.ItemAttributeInclude
  >,
  typeof Prisma.ModelName.ItemAttribute,
  Prisma.ItemAttributeInclude,
  Prisma.ItemAttributeSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.ItemAttribute}Service`)
    protected readonly service: any // 用動態生成嘅 Service
  ) {
    super();
  }
}
