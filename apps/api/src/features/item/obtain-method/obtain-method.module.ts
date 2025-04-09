// apps/api/src/features/item/obtain-method/obtain-method.module.ts
import { Module } from '@nestjs/common';
import { ObtainMethodController } from './obtain-method.controller';
import { CustomObtainMethodService } from './obtain-method.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [ObtainMethodController],
  providers: [
    CustomObtainMethodService,
    provideBaseService(Prisma.ModelName.ObtainMethod),
  ],
})
export class ObtainMethodModule {}
