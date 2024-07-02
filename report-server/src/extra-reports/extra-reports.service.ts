import fs from 'fs';

import { Injectable } from '@nestjs/common';
import { PrinterService } from '../printer/printer.service';
import { getHTMLContent } from 'src/helpers/html-to-pdfmake';
import { headerSection } from 'src/reports/sections/header.section';

import type { TDocumentDefinitions } from 'pdfmake/interfaces';
import { footerSection } from 'src/reports/sections/footer,section';
import { getCommunityReport } from 'src/reports';

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

  getCommunity() {
    const docDefinition = getCommunityReport();

    const doc = this.printerService.createPdf(docDefinition);
    return doc;
  }

  getCustomSize() {
    const doc = this.printerService.createPdf({
      pageSize: {
        width: 150,
        height: 250,
      },
      content: [
        {
          qr: 'https://github.com/CJavat',
          fit: 100,
          alignment: 'center',
        },
        {
          text: 'Reporte Con Tamaño',
          fontSize: 10,
          alignment: 'center',
          margin: [0, 20],
        },
      ],
    });
    return doc;
  }
}
