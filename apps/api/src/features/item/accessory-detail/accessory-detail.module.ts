// apps/api/src/features/item/accessory-detail/accessory-detail.module.ts
import { Module } from '@nestjs/common';
import { AccessoryDetailController } from './accessory-detail.controller';
import { CustomAccessoryDetailService } from './accessory-detail.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [AccessoryDetailController],
  providers: [
    CustomAccessoryDetailService,
    provideBaseService(Prisma.ModelName.AccessoryDetail),
  ],
})
export class AccessoryDetailModule {}
