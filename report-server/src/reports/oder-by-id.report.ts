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

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  customers: Customers;
  order_details: OrderDetail[];
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValues {
  title?: string;
  subTitle?: string;
  data: CompleteOrder;
}

export const orderByIdReport = (values: ReportValues): TDocumentDefinitions => {
  const { data } = values;
  const { customers: customer, order_date, order_details, order_id } = data;

  const subTotal = order_details.reduce(
    (acc, detail) => acc + detail.quantity * +detail.products.price,
    0,
  );

  const total = subTotal * 1.16;

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
              { text: `Recibo No#: ${order_id}\n`, bold: true },
              `Fecha del recibo: ${DateFormatter.getDDMMYYYY(order_date)} \nPagar antes de: ${DateFormatter.getDDMMYYYY(new Date())}\n`,
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
          `Razón Social: ${customer.customer_name}
            Contacto: ${customer.contact_name}`,
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

            ...order_details.map((detail) => [
              detail.order_detail_id.toString(),
              detail.products.product_name,
              detail.quantity.toString(),
              {
                text: CurrencyFormatter.formatCurrency(+detail.products.price),
                alignment: 'right',
              },
              {
                text: CurrencyFormatter.formatCurrency(
                  +detail.products.price * detail.quantity,
                ),
                alignment: 'right',
              },
            ]),
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
                    text: CurrencyFormatter.formatCurrency(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(total),
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
