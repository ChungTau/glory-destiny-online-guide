// apps/api/src/features/item/weapon-detail/weapon-detail.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomWeaponDetailService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}
}
