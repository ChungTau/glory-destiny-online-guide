// apps/api/src/features/item/armor-set/armor-set.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomArmorSetService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}
}
