// apps/api/src/features/item/item/item.module.ts
import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { CustomItemService } from './item.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [ItemController],
  providers: [CustomItemService, provideBaseService(Prisma.ModelName.Item)],
})
export class ItemModule {}
