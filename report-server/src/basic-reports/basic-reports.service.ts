import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from '../printer/printer.service';
import { getHelloWorldReport } from 'src/reports';
import { getEmploymentLetterReport } from '../reports/employment-letter.report';

@Injectable()
export class BasicReportsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    // console.log('Conectado a la db');
  }

  constructor(private readonly printerService: PrinterService) {
    super(); //? Se necesita llamar para inicializar lo de prisma
  }

  hello() {
    const docDefinition = getHelloWorldReport({ name: 'CJavatX' });

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  employmentLetter() {
    const docDefinition = getEmploymentLetterReport();

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
