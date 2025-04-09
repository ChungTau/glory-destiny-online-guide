// apps/api/src/features/skill/pet-skill-link/pet-skill-link.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { RedisService } from 'src/core/redis/redis.service';

@Injectable()
export class CustomPetSkillLinkService {
  constructor(private prisma: PrismaService, private redis: RedisService) {}
}