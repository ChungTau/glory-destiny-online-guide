// apps/api/src/features/feature.module.ts
import { Module } from '@nestjs/common';
import { GeographyModule } from './geography/geography.module';
import { RoleModule } from './role/role.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule, GeographyModule, RoleModule],
  exports: [GeographyModule, RoleModule],
})
export class FeatureModule {}