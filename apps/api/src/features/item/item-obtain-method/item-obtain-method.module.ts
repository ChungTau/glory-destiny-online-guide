// apps/api/src/features/item/item-obtain-method/item-obtain-method.module.ts
import { Module } from '@nestjs/common';
import { provideJunctionService } from '../../../core/junction/junction.utils';
import { ItemObtainMethodController } from './item-obtain-method.controller';
import { JunctionModule } from 'src/core/junction/junction.module';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [JunctionModule],
  controllers: [ItemObtainMethodController],
  providers: [
    provideJunctionService(
      Prisma.ModelName.ItemObtainMethod,
      'itemId',
      'obtainMethodId'
    ),
  ],
})
export class ItemObtainMethodModule {}
