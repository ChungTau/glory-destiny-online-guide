// apps/api/src/features/item/item-obtain-method/item-obtain-method.controller.ts
import { Controller, Inject } from '@nestjs/common';
import { Prisma } from '@glory-destiny-online-guide/prisma';
import { EntityPayloadWithInclude } from 'src/common/types/prisma.types';
import { JunctionService, JunctionController } from 'src/core/junction';

@Controller('item-obtain-methods')
export class ItemObtainMethodController extends JunctionController<
  EntityPayloadWithInclude<
    typeof Prisma.ModelName.ItemObtainMethod,
    Prisma.ItemObtainMethodInclude
  >,
  typeof Prisma.ModelName.ItemObtainMethod,
  Prisma.ItemObtainMethodInclude,
  Prisma.ItemObtainMethodSelect
> {
  constructor(
    @Inject(`${Prisma.ModelName.ItemObtainMethod}Service`)
    protected readonly service: JunctionService<
      EntityPayloadWithInclude<
        typeof Prisma.ModelName.ItemObtainMethod,
        Prisma.ItemObtainMethodInclude
      >,
      typeof Prisma.ModelName.ItemObtainMethod,
      Prisma.ItemObtainMethodInclude,
      Prisma.ItemObtainMethodSelect
    >,
  ) {
    super();
  }
}
