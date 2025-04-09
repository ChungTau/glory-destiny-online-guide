// apps/api/src/features/item/item.module.ts
import { Module } from '@nestjs/common';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule],
  exports: [],
})
export class ItemModule {}