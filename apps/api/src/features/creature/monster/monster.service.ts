// apps/api/src/features/geography/monster/monster.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomMonsterService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService
  ) {}
}
