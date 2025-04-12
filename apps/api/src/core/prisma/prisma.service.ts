import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import { PrismaClient } from '@glory-destiny-online-guide/prisma';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL, // 從環境變數讀取數據庫URL
        },
      },
    });
  }

  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Prisma connected'); // 取代 console.log
    } catch (err) {
      this.logger.error('Prisma error', err); // 取代 console.log
    }
  }

  async onModuleDestroy() {
    await this.$disconnect(); // 喺模塊銷毀時斷開連繫
    this.logger.log('Prisma Client disconnected from the database');
  }

  [key: string]: any;
}
