import htmlToPdfmake from 'html-to-pdfmake';
import { JSDOM } from 'jsdom';

interface ContentReplacer {
  [key: string]: string;
}

export const getHTMLContent = (
  html: string,
  replacers: ContentReplacer = {},
) => {
  Object.entries(replacers).forEach(([key, value]) => {
    const key1 = `{{ ${key} }}`;
    const key2 = `{{${key}}}`;

    html = html.replaceAll(key1, value).replace(key2, value);
  });

  const { window } = new JSDOM();

  return htmlToPdfmake(html, { window });
};
