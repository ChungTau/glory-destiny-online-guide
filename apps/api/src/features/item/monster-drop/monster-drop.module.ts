// apps/api/src/features/item/monster-drop/monster-drop.module.ts
import { Module } from '@nestjs/common';
import { provideJunctionService } from '../../../core/junction/junction.utils';
import { MonsterDropController } from './monster-drop.controller';
import { JunctionModule } from 'src/core/junction/junction.module';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [JunctionModule],
  controllers: [MonsterDropController],
  providers: [
    provideJunctionService(
      Prisma.ModelName.MonsterDrop,
      'itemId',
      'obtainMethodId',
    ),
  ],
})
export class MonsterDropModule {}
