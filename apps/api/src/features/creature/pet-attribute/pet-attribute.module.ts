// apps/api/src/features/geography/pet-attribute/pet-attribute.module.ts
import { Module } from '@nestjs/common';
import { PetAttributeController } from './pet-attribute.controller';
import { CustomPetAttributeService } from './pet-attribute.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [PetAttributeController],
  providers: [
    CustomPetAttributeService,
    provideBaseService(Prisma.ModelName.PetAttribute),
  ],
})
export class PetAttributeModule {}
