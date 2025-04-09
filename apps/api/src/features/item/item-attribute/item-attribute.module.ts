// apps/api/src/features/item/item-attribute/item-attribute.module.ts
import { Module } from '@nestjs/common';
import { ItemAttributeController } from './item-attribute.controller';
import { CustomItemAttributeService } from './item-attribute.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [ItemAttributeController],
  providers: [
    CustomItemAttributeService,
    provideBaseService(Prisma.ModelName.ItemAttribute),
  ],
})
export class ItemAttributeModule {}
