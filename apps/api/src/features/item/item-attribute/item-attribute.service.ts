// apps/api/src/features/item/item-attribute/item-attribute.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomItemAttributeService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}
}
