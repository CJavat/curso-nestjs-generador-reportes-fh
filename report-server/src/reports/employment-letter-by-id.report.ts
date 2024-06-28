import type { StyleDictionary, TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection } from './sections/header.section';
import { DateFormatter } from 'src/helpers';

interface ReportValues {
  employeerName: string;
  employeerPosition: string;
  employeeName: string;
  employeePosition: string;
  employeeStartDate: Date;
  employeeHours: number;
  employeeWorkSchedule: string;
  employeerCompany: string;
}

const style: StyleDictionary = {
  header: {
    fontSize: 22,
    bold: true,
    alignment: 'center',
    margin: [0, 60, 0, 20],
  },
  body: {
    alignment: 'justify',
    margin: [0, 0, 0, 50],
  },
  signature: {
    fontSize: 14,
    bold: true,
  },
  footer: {
    fontSize: 10,
    italics: true,
    alignment: 'center',
    margin: [0, 0, 0, 20],
  },
};

export const getEmploymentLetterByIdReport = (
  values: ReportValues,
): TDocumentDefinitions => {
  const {
    employeerName,
    employeerPosition,
    employeeName,
    employeePosition,
    employeeStartDate,
    employeeHours,
    employeeWorkSchedule,
    employeerCompany,
  } = values;

  const docDefinition: TDocumentDefinitions = {
    styles: style,
    pageMargins: [40, 60, 40, 60],
    header: headerSection({ showLogo: true, showDate: true }),
    content: [
      {
        text: 'CONSTANCIA DE EMPLEO',
        style: 'header',
      },
      {
        text: `Yo, ${employeerName}, en mi calidad de ${employeerPosition} de ${employeerCompany}, 
              por medio de la presente certifco que ${employeeName} ha sido empleado en nuestra 
              empresa desde el ${DateFormatter.getDDMMYYYY(employeeStartDate)}.\n\n
              Durante su empleo, el Sr./Sra. ${employeeName} ha desempeñado el cargo de ${employeePosition}, demostrando responsabilidad, compromiso y habilidades profesionales en sus 
              labores.\n\n
              La jornada laboral del Sr./ Sra. ${employeeName} es de ${employeeHours} horas 
              semanales, con un horario de ${employeeWorkSchedule}, cumpliendo con las políticas y 
              procedimientos establecidos por la empresa.\n\n
              Esta constancia se expide a solicitud del interesado para los fnes que considere conveniente.\n\n`,
        style: 'body',
      },
      { text: `Atentamente,`, style: 'signature' },
      { text: employeerName, style: 'signature' },
      { text: employeerPosition, style: 'signature' },
      { text: employeerCompany, style: 'signature' },
      { text: DateFormatter.getDDMMYYYY(new Date()), style: 'signature' },
    ],
    footer: {
      text: 'Este documento es una constancia de empleo y no representa un compromiso laboral',
      style: 'footer',
    },
  };

  return docDefinition;
};
