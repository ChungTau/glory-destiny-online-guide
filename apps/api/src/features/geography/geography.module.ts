// apps/api/src/features/geography/geography.module.ts
import { Module } from '@nestjs/common';
import { NationModule } from './nation/nation.module';
import { AreaModule } from './area/area.module';

@Module({
  imports: [NationModule, AreaModule],
  exports: [NationModule, AreaModule],
})
export class GeographyModule {}