// apps/api/src/features/admin/nav-item/nav-item.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomNavItemService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService
  ) {}
}
