// apps/api/src/core/base.module.ts
import { Module, Global } from '@nestjs/common';
import { JunctionServiceFactory } from './junction-service.factory';
import { CoreModule } from '../core.module';

@Global()
@Module({
  imports: [CoreModule],
  providers: [JunctionServiceFactory],
  exports: [JunctionServiceFactory],
})
export class JunctionModule {}
