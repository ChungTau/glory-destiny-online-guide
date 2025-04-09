// apps/api/src/core/base.module.ts
import { Module, Global } from '@nestjs/common';
import { BaseServiceFactory } from './base-service.factory';
import { CoreModule } from '../core.module';

@Global()
@Module({
  imports: [CoreModule],
  providers: [BaseServiceFactory],
  exports: [BaseServiceFactory],
})
export class BaseModule {}
