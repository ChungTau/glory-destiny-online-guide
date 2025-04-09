// apps/api/src/features/item/enhancement-detail/enhancement-detail.module.ts
import { Module } from '@nestjs/common';
import { EnhancementDetailController } from './enhancement-detail.controller';
import { CustomEnhancementDetailService } from './enhancement-detail.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [EnhancementDetailController],
  providers: [
    CustomEnhancementDetailService,
    provideBaseService(Prisma.ModelName.EnhancementDetail),
  ],
})
export class EnhancementDetailModule {}
