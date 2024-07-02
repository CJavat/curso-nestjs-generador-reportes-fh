import type { TDocumentDefinitions } from 'pdfmake/interfaces';

export const getCommunityReport = (): TDocumentDefinitions => {
  const docDefinition: TDocumentDefinitions = {
    defaultStyle: {
      fontSize: 10,
    },
    content: [
      // Logo - Dirección - Número de Orden
      {
        columns: [
          {
            image: 'src/assets/tucan-code-logo.png',
            width: 50,
          },
          {
            alignment: 'center',
            text: `Forest Admin Community SAP\n RUT: 44.123.1233\n Camino Montaña km 16\n Teléfono: 3312135312`,
          },
          {
            alignment: 'right',
            layout: 'borderBlue',
            width: 140,
            table: {
              body: [
                [
                  {
                    layout: 'noBorders',
                    table: {
                      body: [
                        ['No.', '123-456'],
                        ['Fecha', '01/07/2024'],
                        ['Versión', '2024-001'],
                      ],
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
      // Horizontal Line
      {
        margin: [0, 5],
        canvas: [
          {
            type: 'line',
            x1: 0,
            y1: 5,
            x2: 515,
            y2: 5,
            lineWidth: 2,
            lineColor: '#3A4546',
          },
        ],
      },
      // Detalles del cliente
      {
        table: {
          widths: ['auto', '*', 'auto', '*'],
          body: [
            [
              {
                text: 'Datos Del Cliente',
                fillColor: '#5775E1',
                color: 'white',
                colSpan: 4,
                // border: [false, false, false, false],
              },
              {},
              {},
              {},
            ],
            // Razoón Social
            [
              {
                text: 'Razón Social',
                fillColor: '#343A40',
                color: 'white',
                bold: true,
              },
              {
                text: 'Nombre De Empresa',
                fillColor: 'white',
              },
              {
                text: 'Dirección',
                fillColor: '#343A40',
                color: 'white',
              },
              {
                text: 'Calle falsa #123',
                fillColor: 'white',
              },
            ],
            [
              {
                text: 'RUT',
                fillColor: '#343A40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
              {
                text: 'Teléfono',
                fillColor: '#343A40',
                color: 'white',
              },
              {
                text: '',
                fillColor: 'white',
              },
            ],
            [
              {
                text: 'Giro',
                fillColor: '#343A40',
                color: 'white',
                bold: true,
              },
              {
                text: '',
                fillColor: 'white',
              },
              {
                text: 'Condición De Pago',
                fillColor: '#343A40',
                color: 'white',
              },
              {
                text: '',
                fillColor: 'white',
              },
            ],
            //TODO: Terminar el PDF -> Demo Report.
          ],
        },
      },
    ],
  };

  return docDefinition;
};
