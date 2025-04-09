// apps/api/src/features/item/costume-detail/costume-detail.module.ts
import { Module } from '@nestjs/common';
import { CostumeDetailController } from './costume-detail.controller';
import { CustomCostumeDetailService } from './costume-detail.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [CostumeDetailController],
  providers: [
    CustomCostumeDetailService,
    provideBaseService(Prisma.ModelName.CostumeDetail),
  ],
})
export class CostumeDetailModule {}
