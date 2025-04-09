// apps/api/src/features/geography/nation/nation.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomNationService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}
}
