import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PrinterService } from '../printer/printer.service';
import {
  getCountriesReport,
  getEmploymentLetterByIdReport,
  getHelloWorldReport,
} from 'src/reports';
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

  async employmentLetterById(employeeId: number) {
    const employee = await this.employees.findFirst({
      where: { id: employeeId },
    });
    if (!employee)
      throw new NotFoundException(`Employee with id ${employeeId} not found`);

    const docDefinition = getEmploymentLetterByIdReport({
      employeerName: 'Daniel Plascencia',
      employeerPosition: 'Gerente de Sistemas',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employeerCompany: 'Tucan Code Corp.',
    });

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  async getCountry() {
    const countries = await this.countries.findMany({
      where: {
        local_name: {
          not: null,
        },
      },
    });
    const docDefinition = getCountriesReport({ countries });

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
