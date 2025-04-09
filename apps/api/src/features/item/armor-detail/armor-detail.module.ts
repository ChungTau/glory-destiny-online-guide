// apps/api/src/features/item/armor-detail/armor-detail.module.ts
import { Module } from '@nestjs/common';
import { ArmorDetailController } from './armor-detail.controller';
import { CustomArmorDetailService } from './armor-detail.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [ArmorDetailController],
  providers: [
    CustomArmorDetailService,
    provideBaseService(Prisma.ModelName.ArmorDetail),
  ],
})
export class ArmorDetailModule {}
