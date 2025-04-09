// apps/api/src/features/quest/quest-reward-item/quest-reward-item.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomQuestRewardItemService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}
}
