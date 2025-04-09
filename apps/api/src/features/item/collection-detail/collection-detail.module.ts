// apps/api/src/features/item/collection-detail/collection-detail.module.ts
import { Module } from '@nestjs/common';
import { CollectionDetailController } from './collection-detail.controller';
import { CustomCollectionDetailService } from './collection-detail.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [CollectionDetailController],
  providers: [
    CustomCollectionDetailService,
    provideBaseService(Prisma.ModelName.CollectionDetail),
  ],
})
export class CollectionDetailModule {}
