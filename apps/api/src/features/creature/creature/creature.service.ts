// apps/api/src/features/geography/creature/creature.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomCreatureService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}
}
