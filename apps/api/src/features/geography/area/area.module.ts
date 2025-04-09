// apps/api/src/features/geography/area/area.module.ts
import { Module } from '@nestjs/common';
import { AreaController } from './area.controller';
import { AreaService } from './area.service';
import { BaseModule } from 'src/core/base.module';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule.forEntity(Prisma.ModelName.Area, [AreaService])],
  controllers: [AreaController],
  providers: [AreaService],
})
export class AreaModule {}