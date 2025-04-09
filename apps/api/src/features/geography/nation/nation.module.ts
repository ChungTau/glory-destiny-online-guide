// apps/api/src/features/geography/nation/nation.module.ts
import { Module } from '@nestjs/common';
import { NationController } from './nation.controller';
import { NationService } from './nation.service';
import { BaseModule } from 'src/core/base.module';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule.forEntity(Prisma.ModelName.Nation, [NationService])],
  controllers: [NationController],
  providers: [NationService],
})
export class NationModule {}