// apps/api/src/features/skill/skill-advancement/skill-advancement.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomSkillAdvancementService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService,
  ) {}
}
