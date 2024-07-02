import fs from 'fs';

import { Injectable } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { getHTMLContent } from 'src/helpers/html-to-pdfmake';
import { headerSection } from 'src/reports/sections/header.section';

import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection } from 'src/reports/sections/footer,section';

@Injectable()
export class ExtraReportsService {
  constructor(private readonly printerService: PrinterService) {}

  getHtmlReport() {
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf8');

    const content = getHTMLContent(html, {
      client: 'Daniel Plascencia',
      title: 'Hola Mundo',
    });

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [48, 110, 40, 60],
      header: headerSection({
        title: 'HTML To PDFMake',
        subTitle: 'Convertir HTML a PDF',
      }),
      footer: footerSection,
      content,
    };

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }
}
