// apps/api/src/features/quest/quest/quest.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomQuestService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService
  ) {}
}
