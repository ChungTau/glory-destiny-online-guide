// apps/api/src/features/geography/area/area.module.ts
import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { CustomAreaService } from './area.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [AreaController],
  providers: [
    CustomAreaService,
    provideBaseService(Prisma.ModelName.Area)
  ],
})
export class AreaModule {}