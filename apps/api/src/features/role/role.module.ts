// apps/api/src/features/role/role.module.ts
import { Module } from '@nestjs/common';
import { RaceModule } from './race/race.module';
import { JobModule } from './job/job.module';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule, RaceModule, JobModule],
  exports: [RaceModule, JobModule],
})
export class RoleModule {}