// apps/api/src/features/geography/geography.module.ts
import { Module } from '@nestjs/common';
import { NationModule } from './nation/nation.module';
import { AreaModule } from './area/area.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule, NationModule, AreaModule],
  exports: [NationModule, AreaModule],
})
export class GeographyModule {}