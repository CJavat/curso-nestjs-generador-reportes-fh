import type {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';
import { footerSection } from './sections/footer,section';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 30],
};
const styles: StyleDictionary = {
  header: {
    fontSize: 18,
    bold: true,
    margin: [0, 30, 0, 10],
  },
  subHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 30, 0, 10],
  },
};

export const orderByIdReport = (): TDocumentDefinitions => {
  return {
    styles: styles,
    header: logo,
    pageMargins: [40, 60, 40, 60],
    footer: footerSection,
    content: [
      // Headers
      {
        text: 'Tucan Code',
        style: 'header',
      },
      //  Address y Número de recibo
      {
        columns: [
          {
            text: '15 Montgomery Str, Suite 100, \nOttawa ON K2Y 9X1, CANADA \nBN: 12783671823 \nhttps://devtalles.com',
          },
          {
            text: [
              { text: 'Recibo No#: 10255\n', bold: true },
              `Fecha del recibo: ${DateFormatter.getDDMMYYYY(new Date())} \nPagar antes de: ${DateFormatter.getDDMMYYYY(new Date())}\n`,
            ],
            alignment: 'right',
          },
        ],
      },
      // QR
      { qr: 'https://github.com/CJavat', fit: 75, alignment: 'right' },

      // Dirección del cliente
      {
        text: [
          { text: 'Cobrar a:\n', style: 'subHeader' },
          `Razón Social: Richter Supermarkt
            Michael Holz
            Grenzacherweg 237`,
        ],
      },

      // Tabla del detalle de la orde
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],

            [
              '1',
              'Product 1',
              '1',
              '100',
              CurrencyFormatter.formatCurrency(1500),
            ],
            [
              '2',
              'Product 2',
              '2',
              '100',
              {
                text: CurrencyFormatter.formatCurrency(200),
                alignment: 'right',
              },
            ],
          ],
        },
      },
      // Salto de línea
      '\n',

      // Totales
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.formatCurrency(1700),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(2000),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
