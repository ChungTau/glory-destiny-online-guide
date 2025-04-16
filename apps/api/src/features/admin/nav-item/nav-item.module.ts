// apps/api/src/features/admin/nav-item/nav-item.module.ts
import { Module } from '@nestjs/common';
import { NavItemController } from './nav-item.controller';
import { CustomNavItemService } from './nav-item.service';
import { provideBaseService, BaseModule } from 'src/core/base';
import { Prisma } from '@glory-destiny-online-guide/prisma';

@Module({
  imports: [BaseModule],
  controllers: [NavItemController],
  providers: [
    CustomNavItemService,
    provideBaseService(Prisma.ModelName.NavItem),
  ],
})
export class NavItemModule {}
