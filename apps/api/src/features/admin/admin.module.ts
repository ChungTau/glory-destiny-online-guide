// apps/api/src/features/geography/geography.module.ts
import { Module } from '@nestjs/common';
import { NavItemModule } from './nav-item/nav-item.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule, NavItemModule],
  exports: [NavItemModule],
})
export class AdminModule {}
