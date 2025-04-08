import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { PrismaService } from './core/prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue('example-queue') private readonly exampleQueue: Queue,
    private prisma: PrismaService,
  ) {}

  async getHello(): Promise<string> {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return 'Hello World! Database connection successful.';
    } catch (error) {
      return `Hello World! Database connection failed: ${(error as Error).message}`;
    }
  }

  async addExampleJob(data: any) {
    await this.exampleQueue.add('example-job', data); // Add job to queue
    return { message: 'Job added to queue' };
  }
}
