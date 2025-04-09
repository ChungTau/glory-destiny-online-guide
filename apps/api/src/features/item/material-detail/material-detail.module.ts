// apps/api/src/features/item/material-detail/material-detail.module.ts
import { Module } from '@nestjs/common';
import { MaterialDetailController } from './material-detail.controller';
import { CustomMaterialDetailService } from './material-detail.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [MaterialDetailController],
  providers: [
    CustomMaterialDetailService,
    provideBaseService(Prisma.ModelName.MaterialDetail),
  ],
})
export class MaterialDetailModule {}
