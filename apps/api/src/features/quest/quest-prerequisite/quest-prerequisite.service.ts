// apps/api/src/features/quest/quest-prerequisite/quest-prerequisite.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomQuestPrerequisiteService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}
}
