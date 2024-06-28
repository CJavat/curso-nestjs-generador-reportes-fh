import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    // console.log('Conectado a la db');
  }

  async hello() {
    return this.employees.findFirst();
  }
}
