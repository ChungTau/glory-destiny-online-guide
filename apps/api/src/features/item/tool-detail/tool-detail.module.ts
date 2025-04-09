// apps/api/src/features/item/tool-detail/tool-detail.module.ts
import { Module } from '@nestjs/common';
import { ToolDetailController } from './tool-detail.controller';
import { CustomToolDetailService } from './tool-detail.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [ToolDetailController],
  providers: [
    CustomToolDetailService,
    provideBaseService(Prisma.ModelName.ToolDetail),
  ],
})
export class ToolDetailModule {}
