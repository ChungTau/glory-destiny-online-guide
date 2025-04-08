import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';

// apps/api/src/queues/queues.module.ts
@Module({
  imports: [
    //BullModule.registerQueue({ name: 'example-queue' }),
    //BullModule.registerQueue({ name: 'data-sync-queue' }),
  ],
  exports: [BullModule],
})
export class QueuesModule {}
