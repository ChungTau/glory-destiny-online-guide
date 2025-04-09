// apps/api/src/features/geography/pet/pet.module.ts
import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import { CustomPetService } from './pet.service'; // 自定義服務改名
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [PetController],
  providers: [
    CustomPetService,
    provideBaseService(Prisma.ModelName.Pet)
  ],
})
export class PetModule {}